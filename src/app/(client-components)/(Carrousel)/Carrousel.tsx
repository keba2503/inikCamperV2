'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import parse from 'html-react-parser';
import Loading from '@/components/loading/Loading';

interface ApiResponse {
  scope_id: number;
  title: string;
  subtitle: string;
  description: string;
  additional_text: string;
}

interface ImageResponse {
  id: string;
  url: string;
}

const CarouselBackground: React.FC = () => {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [images, setImages] = useState<ImageResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const configResponse = await fetch('/api/config');
      const configData = await configResponse.json();
      const filteredData = configData.filter(
        (item: ApiResponse) => item.scope_id === 2,
      );
      setData(filteredData);

      const imagesResponse = await fetch('/api/cloudinaryHero');
      const imagesData = await imagesResponse.json();
      setImages(imagesData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  }, [images.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, images.length]);

  if (loading) {
    return <Loading />;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No se encontraron datos
      </div>
    );
  }

  if (images.length === 0) {
    return <div>No hay imágenes disponibles</div>;
  }

  return (
    <div className="relative w-full h-screen" data-carousel="slide">
      <div className="relative h-full overflow-hidden">
        {images.map((image, index) => {
          const apiData = data[index % data.length] || {
            title: '',
            subtitle: '',
          };
          const title = parse(apiData.title);
          const subtitle = parse(apiData.subtitle);

          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
              data-carousel-item
            >
              <Image
                src={image.url}
                alt={`Slide ${index}`}
                fill
                quality={100}
                priority
                className="object-cover"
              />
              {currentIndex === index && (
                <div className="absolute top-1/4 left-10 text-white text-xl font-semibold text-left animate__animated animate__fadeIn hidden sm:block">
                  <div className="uppercase text-6xl animate__animated animate__fadeIn animate__delay-1s">
                    {title}
                  </div>
                  <div className="text-3xl animate__animated animate__fadeIn animate__delay-1s">
                    {subtitle}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="absolute z-50 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-gray-400'}`}
            aria-current={currentIndex === index}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setCurrentIndex(index)}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>

      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevSlide}
        data-carousel-prev
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Anterior</span>
        </span>
      </button>

      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextSlide}
        data-carousel-next
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50 group-focus:ring-4 group-focus:ring-white">
          <svg
            className="w-4 h-4 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Siguiente</span>
        </span>
      </button>
    </div>
  );
};

export default CarouselBackground;
