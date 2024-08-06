'use client';

import { useState } from 'react';
import HeroForm from '../../(client-components)/(Admin)/Hero/HeroForm';
import HeroTable from '../../(client-components)/(Admin)/Hero/HeroTable';

const HeroPage = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [heroToEdit, setHeroToEdit] = useState(null);

  const handleNewHero = () => {
    setHeroToEdit(null); // Reset heroToEdit to null when creating a new hero
    setIsFormVisible(true);
  };

  const handleFormClose = () => {
    setIsFormVisible(false);
  };

  return (
      <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
        <div className="w-full max-w-7xl">
          <h1 className="mb-4 text-2xl md:text-3xl text-center">
            Sección inicial de la Home
          </h1>
          {isFormVisible ? (
              <HeroForm hero={heroToEdit} onClose={handleFormClose} />
          ) : (
              <>
                <button
                    onClick={handleNewHero}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                >
                  Nuevo
                </button>
                <div className="mt-4">
                  <HeroTable />
                </div>
              </>
          )}
        </div>
      </main>
  );
};

export default HeroPage;
