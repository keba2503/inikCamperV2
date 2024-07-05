'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import VideoForm from './VideoForm';

const VideoClient = ({ id }) => {
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/video/${id}`);
          if (response.ok) {
            const data = await response.json();
            setVideo(data);
          } else {
            console.error('Error fetching video:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching video:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchVideo();
  }, [id]);

  return (
      <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
        <div className="w-full max-w-7xl">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl md:text-3xl text-center flex-1">
              {video ? 'Editar Video' : 'Crear Video'}
            </h1>
          </div>
          {isLoading ? <p>Cargando...</p> : <VideoForm video={video} />}
        </div>
      </main>
  );
};

VideoClient.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default VideoClient;
