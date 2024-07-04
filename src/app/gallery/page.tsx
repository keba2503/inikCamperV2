'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

const FeaturedImageGallery: React.FC = () => {
  const [gallery, setGallery] = useState([]);
  const [active, setActive] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get('/api/cloudinary');
        setGallery(res.data);
        if (res.data.length > 0) {
          setActive(res.data[0].url);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
      <div className="max-w-screen-lg mx-auto space-y-5 pt-10 text-center">
        <h1
          className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl"
          title="Preguntas frecuentes sobre el alquiler de apartamentos vacacionales"
        >
          Nuestra Galería
        </h1>
      </div>
      <div className="w-full max-w-6xl mx-auto pt-12 p-6 pb-20">
        <div className="mb-4">
          {active && (
            <Image
              className="h-auto w-full max-w-full rounded-lg object-cover object-center md:h-[480px]"
              src={active}
              alt="Active gallery image"
              width={1200}
              height={800}
            />
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {gallery.map(({ id, url }) => (
            <div key={id}>
              <Image
                onClick={() => setActive(url)}
                src={url}
                className={`h-22 w-full cursor-pointer rounded-lg object-cover object-center transition-transform duration-200 ${
                  active === url
                    ? 'ring-4 ring-blue-500 transform scale-105 p-2'
                    : ''
                }`}
                alt="Gallery thumbnail"
                width={240}
                height={160}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedImageGallery;
