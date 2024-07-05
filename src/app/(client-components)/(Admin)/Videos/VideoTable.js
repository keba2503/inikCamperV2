'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/solid';

const VideoTable = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideos = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/video');
      const data = await response.json();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/video/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setVideos(videos.filter((video) => video.id !== id));
      } else {
        console.error('Error deleting video:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-medium text-gray-900">Videos</h2>
          <button
              onClick={fetchVideos}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Título
            </th>
            <th scope="col" className="px-6 py-3">
              Url del video
            </th>
            <th scope="col" className="px-6 py-3">
              Acción
            </th>
          </tr>
          </thead>
          <tbody>
          {videos.map((video) => (
              <tr
                  key={video.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {video.title}
                </th>
                <td className="px-6 py-4">
                  {video.thumbnail}
                </td>
                <td className="px-6 py-4 flex space-x-2">
                  <Link
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      href={`/admin/videos/${video.id}`}
                  >
                    Editar
                  </Link>
                  <button
                      onClick={() => handleDelete(video.id)}
                      className="text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
              <svg
                  className="animate-spin h-5 w-5 text-blue-500"
                  viewBox="0 0 24 24"
              >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                ></circle>
                <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            </div>
        )}
      </div>
  );
};

export default VideoTable;
