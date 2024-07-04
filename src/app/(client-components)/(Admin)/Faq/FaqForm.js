'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const RichTextEditor = dynamic(() => import('src/components/RichTextEditor'), {
  ssr: false,
});

const GuideForm = ({ faq }) => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (faq) {
      setQuestion(faq.question);
      setAnswer(faq.answer);
    }
  }, [faq]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    const guideData = {
      question,
      answer,
    };

    try {
      const response = await fetch(`/api/faq/${faq ? faq.id : ''}`, {
        method: faq ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(guideData),
      });

      if (response.ok) {
        setSuccessMessage('¡Guía guardada correctamente!');
        if (!faq) {
          setQuestion('');
          setAnswer('');
        }
      } else {
        console.error('Error saving faq:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving faq:', error);
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
          htmlFor="question-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Pregunta
        </label>
        <input
          type="text"
          id="question-input"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="answer-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Respuesta
        </label>
        <RichTextEditor value={answer} onChange={setAnswer} />
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
          href="/src/app/(client-components)/(Admin)/faq"
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

GuideForm.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string,
    answer: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default GuideForm;
