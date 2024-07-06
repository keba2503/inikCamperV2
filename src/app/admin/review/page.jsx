'use client';

import ReviewForm from '../../(client-components)/(Admin)/Review/ReviewForm';
import ReviewTable from '../../(client-components)/(Admin)/Review/ReviewTable';

const HeroPage = () => {
  return (
    <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
      <div className="w-full max-w-7xl">
        <h1 className={`mb-4 text-2xl md:text-3xl text-center`}>
         Reseñas
        </h1>
        <ReviewForm />
        <div className="mt-4">
          <ReviewTable />
        </div>
      </div>
    </main>
  );
};

export default HeroPage;
