'use client';

import HeroForm from '../../(client-components)/(Admin)/Hero/HeroForm';
import HeroTable from '../../(client-components)/(Admin)/Hero/HeroTable';

const GuidePage = () => {
  return (
    <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
      <div className="w-full max-w-7xl">
        <h1 className={`mb-4 text-2xl md:text-3xl text-center`}>
          Sección inicial de la Home
        </h1>
        <HeroForm />
        <div className="mt-4">
          <HeroTable />
        </div>
      </div>
    </main>
  );
};

export default GuidePage;
