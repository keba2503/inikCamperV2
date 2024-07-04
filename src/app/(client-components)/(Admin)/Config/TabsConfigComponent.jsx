'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import SectionAbout from './Forms/SectionAbout';
import SectionFaq from './Forms/SectionFaq';
import SectionGuide from './Forms/SectionGuide';
import SectionHero from './Forms/SectionHero';
import SectionOurFeatures from './Forms/SectionOurFeatures';
import SectionService from './Forms/SectionService';
import TableTextConfig from '../Tables/TableTextConfig';
import SectionCardService from './Forms/SectionCardService';
import SectionCardOffer from './Forms/SectionCardOffer';
import SectionOffer from './Forms/SectionOffer';
import SectionBookingSuccess from './Forms/SectionBookingSuccess';

const TabsComponent = () => {
  const [scopes, setScopes] = useState([]);
  const [activeTab, setActiveTab] = useState('');
  const [imageURLs, setImageURLs] = useState([]);
  const [activeImageURL, setActiveImageURL] = useState('');
  const [isImageMinimized, setIsImageMinimized] = useState(false);

  useEffect(() => {
    const fetchScopes = async () => {
      try {
        const response = await axios.get('/api/scope');
        setScopes(response.data);
        if (response.data.length > 0) {
          setActiveTab(response.data[0].id);
        }
      } catch (error) {
        console.error('Error fetching scopes:', error);
      }
    };

    const fetchImageURLs = async () => {
      try {
        const response = await axios.get('/api/cloudinaryConfig');
        setImageURLs(response.data);
      } catch (error) {
        console.error('Error fetching image URLs:', error);
      }
    };

    fetchScopes();
    fetchImageURLs();
  }, []);

  useEffect(() => {
    const activeScope = scopes.find((scope) => scope.id === activeTab);
    if (activeScope) {
      const image = imageURLs.find((img) => img.id.includes(activeScope.name));
      if (image) {
        setActiveImageURL(image.url);
      } else {
        setActiveImageURL('');
      }
    }
  }, [activeTab, scopes, imageURLs]);

  const componentMapping = {
    8: SectionAbout,
    10: SectionFaq,
    9: SectionGuide,
    2: SectionHero,
    3: SectionOurFeatures,
    7: SectionService,
    11: SectionCardService,
    12: SectionCardOffer,
    13: SectionOffer,
    14: SectionBookingSuccess,
  };

  const ActiveComponent = componentMapping[activeTab] || null;

  return (
    <>
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
        {scopes.map((scope) => (
          <li className="me-2" key={scope.id}>
            <a
              href="#"
              onClick={() => {
                setActiveTab(scope.id);
                setIsImageMinimized(false);
              }}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === scope.id
                  ? 'text-blue-600 bg-gray-100 dark:bg-gray-800 dark:text-blue-500'
                  : 'hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300'
              }`}
            >
              {scope.name}
            </a>
          </li>
        ))}
      </ul>
      {activeImageURL && (
        <div className="relative w-full flex justify-center items-center mt-4 pb-10 pt-8">
          {!isImageMinimized ? (
            <div className="relative">
              <Image
                src={activeImageURL}
                alt="Active Tab"
                layout="responsive"
                width={600}
                height={400}
                className="w-full h-auto max-h-64 object-contain"
              />
              <button
                onClick={() => setIsImageMinimized(true)}
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2"
              >
                _
              </button>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setIsImageMinimized(false)}
                className="absolute top-2 right-2 bg-gray-800 text-white rounded-full p-2"
              >
                ⬆
              </button>
            </div>
          )}
        </div>
      )}
      {ActiveComponent && <ActiveComponent scope={activeTab} />}
      <TableTextConfig scope={activeTab} />
    </>
  );
};

export default TabsComponent;
