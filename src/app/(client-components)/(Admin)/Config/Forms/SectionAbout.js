'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
});

const SectionAbout = ({ scope, data }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [additionalText, setAdditionalText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setSubtitle(data.subtitle || '');
      setDescription(data.description || '');
      setAdditionalText(data.additional_text || '');
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const payload = {
      scope_id: parseInt(scope, 10),
      title,
      subtitle,
      description,
      additional_text: additionalText,
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
          setSubtitle('');
          setDescription('');
          setAdditionalText('');
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
          Párrafo de bienvenida
        </label>
        <RichTextEditor value={description} onChange={setDescription} />
      </div>
      <div className="mb-5">
        <label
          htmlFor="additional-text-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Párrafo explicativo
        </label>
        <RichTextEditor value={additionalText} onChange={setAdditionalText} />
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

SectionAbout.propTypes = {
  scope: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  data: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string,
    additional_text: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default SectionAbout;
