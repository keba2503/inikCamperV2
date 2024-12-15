'use client';

import React, { useContext, useEffect, useState } from 'react';
import SocialsList from '@/shared/SocialsList';
import Label from '@/components/Label';
import Input from '@/shared/Input';
import Textarea from '@/shared/Textarea';
import ButtonPrimary from '@/shared/ButtonPrimary';
import { LanguageContext } from '@/context/LanguageContext';
import { translateText } from '@/utils/translate';

const PageContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [translatedTexts, setTranslatedTexts] = useState({
    contact: 'Contacto',
    fullName: 'Nombre completo',
    email: 'Dirección de correo',
    message: 'Mensaje',
    sendMessage: 'Enviar mensaje',
    address: '🗺 Dirección',
    emailTitle: '💌 Correo electrónico',
    successMessage: 'Mensaje enviado con éxito!',
    errorMessage: 'Error al enviar el mensaje.',
    socialMedia: '🌏 Redes sociales',
    addressDesc: 'Gran Canaria, España',
    emailDesc: 'inikcamper@gmail.com',
  });

  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('LanguageContext must be used within a LanguageProvider');
  }

  const { language } = context;

  useEffect(() => {
    const translateStaticTexts = async () => {
      try {
        const translated = {
          contact: await translateText('Contacto', language),
          fullName: await translateText('Nombre completo', language),
          email: await translateText('Dirección de correo', language),
          message: await translateText('Mensaje', language),
          sendMessage: await translateText('Enviar mensaje', language),
          address: await translateText('🗺 Dirección', language),
          emailTitle: await translateText('💌 Correo electrónico', language),
          successMessage: await translateText('Mensaje enviado con éxito!', language),
          errorMessage: await translateText('Error al enviar el mensaje.', language),
          socialMedia: await translateText('🌏 Redes sociales', language),
          addressDesc: await translateText('Gran Canaria, España', language),
          emailDesc: await translateText('inikcamper@gmail.com', language),
        };
        setTranslatedTexts(translated);
      } catch (error) {
        console.error('Error translating texts:', error);
      }
    };

    translateStaticTexts();
  }, [language]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/sendmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (result.success) {
      setResponseMessage(translatedTexts.successMessage);
      setIsError(false);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } else {
      setResponseMessage(translatedTexts.errorMessage);
      setIsError(true);
    }

    setTimeout(() => {
      setResponseMessage('');
    }, 3000);
  };

  return (
      <div className="nc-PageContact overflow-hidden">
        <div className="mb-24 lg:mb-32">
          <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            {translatedTexts.contact}
          </h2>
          <div className="container max-w-7xl mx-auto">
            <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
              <div className="max-w-sm space-y-8">
                <div>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {translatedTexts.address}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  {translatedTexts.addressDesc}
                </span>
                </div>
                <div>
                  <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                    {translatedTexts.emailTitle}
                  </h3>
                  <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  {translatedTexts.emailDesc}
                </span>
                </div>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  {translatedTexts.socialMedia}
                </h3>
                <div className="pl-10">
                  <SocialsList className="mt-2" />
                </div>
              </div>
              <div>
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                  <label className="block">
                    <Label>{translatedTexts.fullName}</Label>
                    <Input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1"
                    />
                  </label>
                  <label className="block">
                    <Label>{translatedTexts.email}</Label>
                    <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                    />
                  </label>
                  <label className="block">
                    <Label>{translatedTexts.message}</Label>
                    <Textarea
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1"
                    />
                  </label>
                  <div>
                    <ButtonPrimary type="submit">{translatedTexts.sendMessage}</ButtonPrimary>
                  </div>
                </form>
                {responseMessage && (
                    <p
                        className={`mt-4 ${isError ? 'text-red-500' : 'text-green-500'}`}
                    >
                      {responseMessage}
                    </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default PageContact;
