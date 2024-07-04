'use client';

import { useState } from 'react';
import axios from 'axios';

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!image) {
      alert('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'ml_default');
    formData.append('folder', 'arinagacolors/hero');

    try {
      await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      setMessage('Su imagen se ha subido exitosamente');
    } catch (error) {
      console.error('Error uploading the image:', error);
      setMessage('Hubo un error al subir la imagen');
    }
  };

  return (
    <form className="max-w-lg mx-auto pt-10">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        htmlFor="user_avatar"
      >
        Subir imagen
      </label>
      <div className="flex items-center">
        <label className="block w-full">
          <span className="sr-only">Escoge tu imagen</span>
          <input
            type="file"
            id="user_avatar"
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 hidden"
            onChange={handleFileChange}
          />
          <div className="flex items-center justify-between">
            <span className="block w-full text-sm text-gray-500 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg py-2 px-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-center">
              {image ? image.name : 'Choose a file'}
            </span>
            <button
              type="button"
              className="ml-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
              onClick={() => document.getElementById('user_avatar').click()}
            >
              Buscar
            </button>
          </div>
        </label>
      </div>
      <div
        className="mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="user_avatar_help"
      ></div>
      <button
        type="button"
        className="mt-4 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={handleUpload}
      >
        Subir
      </button>
      {message && <p className="mt-4 text-green-500">{message}</p>}
    </form>
  );
};

export default UploadImage;
