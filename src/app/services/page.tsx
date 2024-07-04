import React from 'react';
import ServiceGallery from '../../../../InikCamperV2/src/app/services/ServiceGallery';

const Home: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex  justify-center">
        <ServiceGallery />
      </div>
    </>
  );
};

export default Home;
