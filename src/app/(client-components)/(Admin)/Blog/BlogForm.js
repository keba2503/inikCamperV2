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

const BlogForm = ({ blog }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const [bodyImage, setBodyImage] = useState(null);
  const [bodyImagePreview, setBodyImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || '');
      setDescription(blog.description || '');
      setArticle(blog.article || '');
      if (blog.coverImageUrl) {
        const coverImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${blog.coverImageUrl}.webp`;
        setCoverImagePreview(coverImageUrl);
      }
      if (blog.bodyImageUrl) {
        const bodyImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${blog.bodyImageUrl}.webp`;
        setBodyImagePreview(bodyImageUrl);
      }
    }
  }, [blog]);

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

    let coverImageName = blog ? blog.coverImageUrl : '';
    let bodyImageName = blog ? blog.bodyImageUrl : '';

    const uploadImage = async (image, folder) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'ml_default');
      formData.append('folder', folder);

      try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData,
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
      if (blog && blog.coverImageUrl) {
        try {
          await axios.delete('/api/cloudinaryBlog', {
            data: { public_id: blog.coverImageUrl },
          });
        } catch (error) {
          console.error('Error deleting the previous cover image:', error);
        }
      }
      try {
        coverImageName = await uploadImage(coverImage, 'inikcamper/blog');
      } catch (error) {
        return;
      }
    }

    if (bodyImage) {
      if (blog && blog.bodyImageUrl) {
        try {
          await axios.delete('/api/cloudinaryBlog', {
            data: { public_id: blog.bodyImageUrl },
          });
        } catch (error) {
          console.error('Error deleting the previous body image:', error);
        }
      }
      try {
        bodyImageName = await uploadImage(bodyImage, 'inikcamper/blog');
      } catch (error) {
        return;
      }
    }

    const blogData = {
      title,
      description,
      article,
      coverImageUrl: coverImageName,
      bodyImageUrl: bodyImageName,
    };

    try {
      const response = await fetch(`/api/blog/${blog ? blog.id : ''}`, {
        method: blog ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blogData),
      });

      if (response.ok) {
        await response.json();
        setSuccessMessage('¡Blog guardado correctamente!');
        if (!blog) {
          setTitle('');
          setDescription('');
          setArticle('');
          setCoverImage(null);
          setCoverImagePreview('');
          setBodyImage(null);
          setBodyImagePreview('');
        }
      } else {
        console.error('Error saving blog:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving blog:', error);
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
              htmlFor="title-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
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
              htmlFor="article-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Artículo
          </label>
          <RichTextEditor value={article} onChange={setArticle} />
        </div>
        <div className="mb-5">
          <label
              htmlFor="cover-image-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
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
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {blog && blog.coverImageUrl ? 'Editar imagen' : 'Seleccionar imagen'}
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
        <div className="mb-5">
          <label
              htmlFor="body-image-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            URL de Imagen del Cuerpo
          </label>
          <div className="flex items-center">
            <input
                type="file"
                id="body-image-input"
                onChange={(e) => handleFileChange(e, setBodyImage, setBodyImagePreview)}
                className="hidden"
            />
            <label
                htmlFor="body-image-input"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {blog && blog.bodyImageUrl ? 'Editar imagen' : 'Seleccionar imagen'}
            </label>
            {bodyImagePreview && (
                <div className="ml-4">
                  <Image
                      src={bodyImagePreview}
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
              href="/src/app/(client-components)/(Admin)/blog"
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

BlogForm.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    article: PropTypes.string,
    coverImageUrl: PropTypes.string,
    bodyImageUrl: PropTypes.string,
  }),
};

export default BlogForm;
