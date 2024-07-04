'use client';

import BlogForm from '../../(client-components)/(Admin)/Blog/BlogForm';
import BlogTable from '../../(client-components)/(Admin)/Blog/BlogTable';

const GuidePage = () => {
  return (
    <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
      <div className="w-full max-w-7xl">
        <h1 className={`mb-4 text-2xl md:text-3xl text-center`}>
          Guía del huésped
        </h1>
        <BlogForm />
        <div className="mt-4">
          <BlogTable />
        </div>
      </div>
    </main>
  );
};

export default GuidePage;
