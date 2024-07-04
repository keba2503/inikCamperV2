'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BlogForm from 'src/app/(client-components)/(Admin)/Blog/BlogForm';

const BlogClient = ({ id }) => {
  const [guide, setGuide] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGuide = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/guide/${id}`);
          if (response.ok) {
            const data = await response.json();
            setGuide(data);
          } else {
            console.error('Error fetching guide:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching guide:', error);
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
            {guide ? 'Editar articulo de blog' : 'Crear articulo de blog'}
          </h1>
        </div>
        {isLoading ? <p>Cargando...</p> : <BlogForm guide={guide} />}
      </div>
    </main>
  );
};

BlogClient.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default BlogClient;
