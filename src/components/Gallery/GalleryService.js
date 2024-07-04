'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const GalleryService = () => {
  const [gallery, setGallery] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('/api/cloudinaryService');
        setGallery(res.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, [refreshKey]);

  const handleDelete = async (imageId) => {
    try {
      const res = await axios.delete('/api/cloudinaryService', {
        data: { public_id: imageId },
      });

      if (res.data.result === 'ok') {
        setGallery(gallery.filter((image) => image.id !== imageId));
      } else {
        console.error('Error deleting image:', res.data);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleRefresh = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div>
      <button
        onClick={handleRefresh}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded flex items-center justify-center"
      >
        <ArrowPathIcon className="w-5 h-5 mr-2" />
        Actualizar
      </button>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4">
        {gallery.map((image) => (
          <div key={image.id} className="relative">
            <Image
              src={image.url}
              alt=""
              layout="responsive"
              width={600}
              height={400}
              className="h-auto max-w-full rounded-lg"
            />
            <button
              onClick={() => handleDelete(image.id)}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4v4m4-4v4M1 7h22"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryService;
