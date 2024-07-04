'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Image from 'next/image';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
});

const SectionCardService = ({ scope, data }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setSubtitle(data.subtitle || '');
      setDescription(data.description || '');
      if (data.subtitle) {
        const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${data.subtitle}.webp`;
        setImagePreview(imageUrl);
      }
    }
  }, [data]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    let imageName = subtitle;

    if (image) {
      if (data && data.subtitle) {
        try {
          await axios.delete('/api/cloudinaryService', {
            data: { public_id: data.subtitle },
          });
        } catch (error) {
          console.error('Error deleting the previous image:', error);
        }
      }

      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'ml_default');
      formData.append('folder', 'arinagacolors/service');

      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
        );
        imageName = res.data.public_id;
        setSubtitle(imageName);
      } catch (error) {
        console.error('Error uploading the image:', error);
        setIsSubmitting(false);
        setSuccessMessage('Hubo un error al subir la imagen');
        return;
      }
    }

    const payload = {
      scope_id: parseInt(scope, 10),
      title,
      subtitle: imageName,
      description,
    };

    try {
      const response = await fetch(`/api/config/${data ? data.id : ''}`, {
        method: data ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await response.json();
        setSuccessMessage(
          '¡Se ha guardado correctamente, actualiza para ver los cambios!',
        );
        if (!data) {
          setTitle('');
          setDescription('');
          setImage(null);
          setImagePreview('');
        }
      } else {
        console.error('Error saving data:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-5">
        <label
          htmlFor="scope-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Id De la sección
        </label>
        <input
          type="text"
          id="scope-input"
          value={scope}
          readOnly
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-200 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="title-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Titulo
        </label>
        <input
          type="text"
          id="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="description-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Descripción
        </label>
        <RichTextEditor value={description} onChange={setDescription} />
      </div>
      <div className="mb-5">
        <label
          htmlFor="image-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Imagen asociada
        </label>
        <div className="flex items-center">
          <input
            type="file"
            id="image-input"
            onChange={handleFileChange}
            className="hidden"
          />
          <label
            htmlFor="image-input"
            className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {data && data.subtitle ? 'Editar imagen' : 'Seleccionar imagen'}
          </label>
          {imagePreview && (
            <div className="ml-4">
              <Image
                src={imagePreview}
                alt="Vista previa"
                width={80}
                height={80}
                className="h-20 w-20 object-cover rounded border"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </button>
        <Link
          href="/admin/config"
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Volver
        </Link>
      </div>
      {successMessage && (
        <div className="mt-4 text-green-500">{successMessage}</div>
      )}
    </form>
  );
};

SectionCardService.propTypes = {
  scope: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    additional_text: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default SectionCardService;
