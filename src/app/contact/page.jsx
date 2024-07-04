'use client';

import React, { useState } from 'react';
import SocialsList from '@/shared/SocialsList';
import Label from '@/components/Label';
import Input from '@/shared/Input';
import Textarea from '@/shared/Textarea';
import ButtonPrimary from '@/shared/ButtonPrimary';

const info = [
  {
    title: '🗺 Dirección',
    desc: 'Gran Canaria, España',
  },
  {
    title: '💌 Correo electrónico',
    desc: 'inikcamper@gmail.com',
  },
];

const PageContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [isError, setIsError] = useState(false);

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
      setResponseMessage('Mensaje enviado con éxito!');
      setIsError(false);
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } else {
      setResponseMessage('Error al enviar el mensaje.');
      setIsError(true);
    }

    // Ocultar el mensaje de respuesta después de 3 segundos
    setTimeout(() => {
      setResponseMessage('');
    }, 3000);
  };

  return (
      <div className="nc-PageContact overflow-hidden">
        <div className="mb-24 lg:mb-32">
          <h2 className="my-16 sm:my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Contacto
          </h2>
          <div className="container max-w-7xl mx-auto">
            <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-12 ">
              <div className="max-w-sm space-y-8">
                {info.map((item, index) => (
                    <div key={index}>
                      <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                        {item.title}
                      </h3>
                      <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                    {item.desc}
                  </span>
                    </div>
                ))}
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  🌏 Redes sociales
                </h3>
                <div className="pl-10">
                  <SocialsList className="mt-2" />
                </div>
              </div>
              <div>
                <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
                  <label className="block">
                    <Label>Nombre completo</Label>
                    <Input
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1"
                    />
                  </label>
                  <label className="block">
                    <Label>Dirección de correo</Label>
                    <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                    />
                  </label>
                  <label className="block">
                    <Label>Mensaje</Label>
                    <Textarea
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="mt-1"
                    />
                  </label>
                  <div>
                    <ButtonPrimary type="submit">Enviar mensaje</ButtonPrimary>
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
