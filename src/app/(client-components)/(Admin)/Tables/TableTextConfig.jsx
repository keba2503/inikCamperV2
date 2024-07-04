'use client';

import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import axios from 'axios';

const TableTextConfig = ({ scope }) => {
  const [data, setData] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/config');
      const result = await response.json();
      const filteredData = result.filter((item) => item.scope_id === scope);
      setData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [scope]);

  const handleDelete = async (id, subtitle) => {
    try {
      const response = await fetch(`/api/config/${id}`, { method: 'DELETE' });
      if (response.ok) {
        if (subtitle) {
          try {
            const res = await axios.delete('/api/cloudinaryService', {
              data: { public_id: subtitle },
            });
            if (res.data.result !== 'ok') {
              console.error('Error deleting image:', res.data);
            }
          } catch (error) {
            console.error('Error deleting image:', error);
          }
        }
        setFeedbackMessage('Se ha eliminado correctamente.');
        fetchData();
      } else {
        setFeedbackMessage('Failed to delete item.');
      }
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting data:', error);
      setFeedbackMessage('Failed to delete item.');
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="flex justify-between p-2">
        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          <ArrowPathIcon className="h-5 w-5" />
        </button>
      </div>
      {feedbackMessage && (
        <div
          className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
          role="alert"
        >
          {feedbackMessage}
        </div>
      )}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Titulo
            </th>
            <th scope="col" className="px-6 py-3">
              Subtitulo
            </th>
            <th scope="col" className="px-6 py-3">
              Descripción
            </th>
            <th scope="col" className="px-6 py-3">
              Texto adicional
            </th>
            <th scope="col" className="px-6 py-3">
              Acción
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="px-6 py-4">{item.id}</td>
              <td className="px-6 py-4">{item.title}</td>
              <td className="px-6 py-4">{item.subtitle}</td>
              <td
                className="px-6 py-4"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
              <td className="px-6 py-4">{item.additional_text}</td>
              <td className="flex items-center px-6 py-4">
                <Link
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                  href={`/admin/config/${item.id}?scope=${item.scope_id}`}
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(item.id, item.subtitle)}
                  className="text-red-600 hover:text-red-800 ml-4"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

TableTextConfig.propTypes = {
  scope: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default TableTextConfig;
