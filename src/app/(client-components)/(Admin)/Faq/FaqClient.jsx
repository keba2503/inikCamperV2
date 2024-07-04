'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import GuideForm from 'src/app/(client-components)/(Admin)/Faq/FaqForm';

const FaqClient = ({ id }) => {
  const [faq, setFaq] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/faq/${id}`);
          if (response.ok) {
            const data = await response.json();
            setFaq(data);
          } else {
            console.error('Error fetching faq:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching faq:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchGuide();
  }, [id]);

  return (
    <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
      <div className="w-full max-w-7xl">
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl md:text-3xl text-center flex-1">
            {faq ? 'Editar Guía del huésped' : 'Crear Guía del huésped'}
          </h1>
        </div>
        {isLoading ? <p>Cargando...</p> : <GuideForm faq={faq} />}
      </div>
    </main>
  );
};

FaqClient.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default FaqClient;
