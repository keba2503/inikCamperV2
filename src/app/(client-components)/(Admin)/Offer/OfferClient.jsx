'use client'

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OfferForm from 'src/app/(client-components)/(Admin)/Offer/OfferForm';
import axios from 'axios';

const OfferClient = ({ id }) => {
  const [offer, setOffer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffer = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/offer/${id}`);
          if (response.status === 200) {
            setOffer(response.data);
          } else {
            console.error('Error fetching offer:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching offer:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchOffer();
  }, [id]);

  return (
      <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
        <div className="w-full max-w-7xl">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl md:text-3xl text-center flex-1">
              {offer ? 'Editar oferta' : 'Crear nueva oferta'}
            </h1>
          </div>
          {isLoading ? <p>Cargando...</p> : <OfferForm offer={offer} />}
        </div>
      </main>
  );
};

OfferClient.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default OfferClient;
