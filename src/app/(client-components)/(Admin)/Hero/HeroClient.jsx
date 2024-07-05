'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import HeroForm from 'src/app/(client-components)/(Admin)/Hero/HeroForm';

const HeroClient = ({ id }) => {
  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/hero/${id}`);
          if (response.ok) {
            const data = await response.json();
            setHero(data);
          } else {
            console.error('Error fetching hero:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching hero:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchHero();
  }, [id]);

  return (
      <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
        <div className="w-full max-w-7xl">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl md:text-3xl text-center flex-1">
              {hero ? 'Editar héroe' : 'Crear héroe'}
            </h1>
          </div>
          {isLoading ? <p>Cargando...</p> : <HeroForm hero={hero} />}
        </div>
      </main>
  );
};

HeroClient.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default HeroClient;
