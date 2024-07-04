'use client';

import React, { useEffect, useState } from 'react';
import ServiceCard from '@/app/services/Service';
import Heading from '@/shared/Heading';
import parse from 'html-react-parser';

interface ApiResponse {
  scope_id: number;
  title: string;
  description: string;
  subtitle: string | null;
}

interface ImageResponse {
  id: string;
  url: string;
}

const ServiceGallery: React.FC = () => {
  const [data, setData] = useState<ApiResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState<{
    title: string;
    description: string;
  } | null>(null);
  const [images, setImages] = useState<ImageResponse[]>([]);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await fetch('/api/config');
        const configData = await response.json();

        const filteredServices = configData.filter(
          (item: ApiResponse) => item.scope_id === 11,
        );
        const headerData = configData.find(
          (item: ApiResponse) => item.scope_id === 7,
        );

        setHeader(
          headerData
            ? { title: headerData.title, description: headerData.description }
            : null,
        );
        setData(filteredServices);
      } catch (error) {
        console.error('Error fetching config data:', error);
      }
    };

    const fetchImages = async () => {
      try {
        const response = await fetch('/api/cloudinaryService');
        const imageData = await response.json();
        setImages(imageData);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchConfig();
    fetchImages();
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const getImageUrl = (subtitle: string | null) => {
    if (!subtitle) return '';
    const image = images.find((img) =>
      img.id.toLowerCase().includes(subtitle.toLowerCase()),
    );
    return image ? image.url : '';
  };

  return (
    <div className="relative py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
      {header && (
        <Heading className="pb-20" desc={parse(header.description)}>
          ⛱ {parse(header.title)}
        </Heading>
      )}
      <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-center justify-center">
        {data.map((service, index) => (
          <div key={index} className="mb-6 sm:mb-6 sm:mx-3">
            <ServiceCard
              title={service.title}
              description={parse(service.description)}
              imageUrl={getImageUrl(service.subtitle)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceGallery;
