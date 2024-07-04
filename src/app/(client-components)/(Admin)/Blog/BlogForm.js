'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

const RichTextEditor = dynamic(() => import('src/components/RichTextEditor'), {
  ssr: false,
});

const BlogForm = ({ blog }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [article, setArticle] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [bodyImageUrl, setBodyImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
      setArticle(blog.article);
      setCoverImageUrl(blog.coverImageUrl);
      setBodyImageUrl(blog.bodyImageUrl);
    }
  }, [blog]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const blogData = {
      title,
      description,
      article,
      coverImageUrl,
      bodyImageUrl,
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
          setCoverImageUrl('');
          setBodyImageUrl('');
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
              htmlFor="coverImageUrl-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            URL de Imagen de Portada
          </label>
          <input
              type="text"
              id="coverImageUrl-input"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
              htmlFor="bodyImageUrl-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            URL de Imagen del Cuerpo
          </label>
          <input
              type="text"
              id="bodyImageUrl-input"
              value={bodyImageUrl}
              onChange={(e) => setBodyImageUrl(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
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
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              href="/src/app/(client-components)/(Admin)/blog"
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
