'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Image from 'next/image';
import Link from "next/link";

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
});

const HeroForm = ({ hero, onClose }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (hero) {
      setTitle(hero.title || '');
      setSubtitle(hero.subtitle || '');
      setDescription(hero.description || '');
      if (hero.imageUrl) {
        const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${hero.imageUrl}.webp`;
        setCoverImagePreview(imageUrl);
      }
    }
  }, [hero]);

  const handleFileChange = (e, setImage, setImagePreview) => {
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

    let imageUrl = hero ? hero.imageUrl : '';

    const uploadImage = async (image, folder) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'ml_default');
      formData.append('folder', folder);

      try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        return res.data.public_id;
      } catch (error) {
        console.error('Error uploading the image:', error);
        setIsSubmitting(false);
        setSuccessMessage('Hubo un error al subir la imagen');
        throw error;
      }
    };

    if (coverImage) {
      if (hero && hero.imageUrl) {
        try {
          await axios.delete('/api/cloudinaryHero', {
            data: { public_id: hero.imageUrl },
          });
        } catch (error) {
          console.error('Error deleting the previous cover image:', error);
        }
      }
      try {
        imageUrl = await uploadImage(coverImage, 'inikcamper/hero');
      } catch (error) {
        return;
      }
    }

    const heroData = {
      title,
      subtitle,
      description,
      imageUrl,
    };

    try {
      const response = await fetch(`/api/hero/${hero ? hero.id : ''}`, {
        method: hero ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroData),
      });

      if (response.ok) {
        await response.json();
        setSuccessMessage('¡Hero guardado correctamente!');
        setTimeout(() => setSuccessMessage(''), 3000); // Remove success message after 3 seconds
        if (!hero) {
          setTitle('');
          setSubtitle('');
          setDescription('');
          setCoverImage(null);
          setCoverImagePreview('');
        }
        onClose(); // Close the form after successful submission
      } else {
        console.error('Error saving hero:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving hero:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="title-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Título
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
          <label htmlFor="subtitle-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Subtítulo
          </label>
          <input
              type="text"
              id="subtitle-input"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label htmlFor="description-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Descripción
          </label>
          <RichTextEditor value={description} onChange={setDescription} />
        </div>
        <div className="mb-5">
          <label htmlFor="cover-image-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            URL de Imagen de Portada
          </label>
          <div className="flex items-center">
            <input
                type="file"
                id="cover-image-input"
                onChange={(e) => handleFileChange(e, setCoverImage, setCoverImagePreview)}
                className="hidden"
            />
            <label
                htmlFor="cover-image-input"
                className={`cursor-pointer ${isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                disabled={isSubmitting}
            >
              {hero && hero.imageUrl ? 'Editar imagen' : 'Seleccionar imagen'}
            </label>
            {coverImagePreview && (
                <div className="ml-4">
                  <Image
                      src={coverImagePreview}
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
              className={`font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
              disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
          {hero ? (
              <Link
                  href="/admin/hero"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Volver
              </Link>
          ) : (
              <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancelar
              </button>
          )}
        </div>
        {successMessage && (
            <div className="mt-4 text-green-500">{successMessage}</div>
        )}
      </form>
  );
};

HeroForm.propTypes = {
  hero: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default HeroForm;
