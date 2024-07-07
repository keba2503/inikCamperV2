import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Image from 'next/image';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
});

const OfferForm = ({ offer }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImagePreview, setBannerImagePreview] = useState('');
  const [firstParagraphTitle, setFirstParagraphTitle] = useState('');
  const [firstParagraphDescription, setFirstParagraphDescription] = useState('');
  const [firstParagraphImage1, setFirstParagraphImage1] = useState(null);
  const [firstParagraphImagePreview1, setFirstParagraphImagePreview1] = useState('');
  const [firstParagraphImage2, setFirstParagraphImage2] = useState(null);
  const [firstParagraphImagePreview2, setFirstParagraphImagePreview2] = useState('');
  const [secondParagraphTitle, setSecondParagraphTitle] = useState('');
  const [secondParagraphDescription, setSecondParagraphDescription] = useState('');
  const [secondParagraphImage1, setSecondParagraphImage1] = useState(null);
  const [secondParagraphImagePreview1, setSecondParagraphImagePreview1] = useState('');
  const [secondParagraphImage2, setSecondParagraphImage2] = useState(null);
  const [secondParagraphImagePreview2, setSecondParagraphImagePreview2] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (offer) {
      setTitle(offer.title || '');
      setSubtitle(offer.subtitle || '');
      setBannerImagePreview(offer.bannerUrl || '');
      setFirstParagraphTitle(offer.firstParagraphTitle || '');
      setFirstParagraphDescription(offer.firstParagraphDescription || '');
      setFirstParagraphImagePreview1(offer.firstParagraphImageUrl1 || '');
      setFirstParagraphImagePreview2(offer.firstParagraphImageUrl2 || '');
      setSecondParagraphTitle(offer.secondParagraphTitle || '');
      setSecondParagraphDescription(offer.secondParagraphDescription || '');
      setSecondParagraphImagePreview1(offer.secondParagraphImageUrl1 || '');
      setSecondParagraphImagePreview2(offer.secondParagraphImageUrl2 || '');
    }
  }, [offer]);

  const handleFileChange = (e, setImage, setPreview) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    let bannerImageUrl = offer ? offer.bannerUrl : '';
    let firstImageUrl1 = offer ? offer.firstParagraphImageUrl1 : '';
    let firstImageUrl2 = offer ? offer.firstParagraphImageUrl2 : '';
    let secondImageUrl1 = offer ? offer.secondParagraphImageUrl1 : '';
    let secondImageUrl2 = offer ? offer.secondParagraphImageUrl2 : '';

    const uploadImage = async (image, folder) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'ml_default');
      formData.append('folder', folder);

      try {
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        return res.data.public_id;
      } catch (error) {
        console.error('Error uploading the image:', error);
        setIsSubmitting(false);
        setSuccessMessage('Hubo un error al subir la imagen');
        throw error;
      }
    };

    if (bannerImage) {
      if (offer && offer.bannerUrl) {
        try {
          await axios.delete('/api/cloudinaryOffer', {
            data: { public_id: offer.bannerUrl },
          });
        } catch (error) {
          console.error('Error deleting the previous banner image:', error);
        }
      }
      try {
        bannerImageUrl = await uploadImage(bannerImage, 'inikcamper/offer');
      } catch (error) {
        setIsSubmitting(false);
        return;
      }
    }

    if (firstParagraphImage1) {
      if (offer && offer.firstParagraphImageUrl1) {
        try {
          await axios.delete('/api/cloudinaryOffer', {
            data: { public_id: offer.firstParagraphImageUrl1 },
          });
        } catch (error) {
          console.error('Error deleting the previous first paragraph image 1:', error);
        }
      }
      try {
        firstImageUrl1 = await uploadImage(firstParagraphImage1, 'inikcamper/offer');
      } catch (error) {
        setIsSubmitting(false);
        return;
      }
    }

    if (firstParagraphImage2) {
      if (offer && offer.firstParagraphImageUrl2) {
        try {
          await axios.delete('/api/cloudinaryOffer', {
            data: { public_id: offer.firstParagraphImageUrl2 },
          });
        } catch (error) {
          console.error('Error deleting the previous first paragraph image 2:', error);
        }
      }
      try {
        firstImageUrl2 = await uploadImage(firstParagraphImage2, 'inikcamper/offer');
      } catch (error) {
        setIsSubmitting(false);
        return;
      }
    }

    if (secondParagraphImage1) {
      if (offer && offer.secondParagraphImageUrl1) {
        try {
          await axios.delete('/api/cloudinaryOffer', {
            data: { public_id: offer.secondParagraphImageUrl1 },
          });
        } catch (error) {
          console.error('Error deleting the previous second paragraph image 1:', error);
        }
      }
      try {
        secondImageUrl1 = await uploadImage(secondParagraphImage1, 'inikcamper/offer');
      } catch (error) {
        setIsSubmitting(false);
        return;
      }
    }

    if (secondParagraphImage2) {
      if (offer && offer.secondParagraphImageUrl2) {
        try {
          await axios.delete('/api/cloudinaryOffer', {
            data: { public_id: offer.secondParagraphImageUrl2 },
          });
        } catch (error) {
          console.error('Error deleting the previous second paragraph image 2:', error);
        }
      }
      try {
        secondImageUrl2 = await uploadImage(secondParagraphImage2, 'inikcamper/offer');
      } catch (error) {
        setIsSubmitting(false);
        return;
      }
    }

    const offerData = {
      title,
      subtitle,
      bannerUrl: bannerImageUrl,
      firstParagraphTitle,
      firstParagraphDescription,
      firstParagraphImageUrl1: firstImageUrl1,
      firstParagraphImageUrl2: firstImageUrl2,
      secondParagraphTitle,
      secondParagraphDescription,
      secondParagraphImageUrl1: secondImageUrl1,
      secondParagraphImageUrl2: secondImageUrl2,
    };

    try {
      const response = await fetch(`/api/offer/${offer ? offer.id : ''}`, {
        method: offer ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(offerData),
      });

      if (response.ok) {
        await response.json();
        setSuccessMessage('¡Oferta guardada correctamente!');
        if (!offer) {
          setTitle('');
          setSubtitle('');
          setBannerImage(null);
          setBannerImagePreview('');
          setFirstParagraphTitle('');
          setFirstParagraphDescription('');
          setFirstParagraphImage1(null);
          setFirstParagraphImagePreview1('');
          setFirstParagraphImage2(null);
          setFirstParagraphImagePreview2('');
          setSecondParagraphTitle('');
          setSecondParagraphDescription('');
          setSecondParagraphImage1(null);
          setSecondParagraphImagePreview1('');
          setSecondParagraphImage2(null);
          setSecondParagraphImagePreview2('');
        }
      } else {
        console.error('Error saving offer:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving offer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
              htmlFor="title-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Título
          </label>
          <input
              type="text"
              id="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
              htmlFor="subtitle-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Subtítulo
          </label>
          <RichTextEditor value={subtitle} onChange={setSubtitle} />
        </div>
        <div className="mb-5">
          <label
              htmlFor="banner-image-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Imagen de Banner
          </label>
          <div className="flex items-center">
            <input
                type="file"
                id="banner-image-input"
                onChange={(e) => handleFileChange(e, setBannerImage, setBannerImagePreview)}
                className="hidden"
            />
            <label
                htmlFor="banner-image-input"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {offer && offer.bannerUrl ? 'Editar imagen' : 'Seleccionar imagen'}
            </label>
            {bannerImagePreview && (
                <div className="ml-4">
                  <Image
                      src={bannerImagePreview}
                      alt="Vista previa"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded border"
                  />
                </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label
              htmlFor="first-paragraph-title-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Título del Primer Párrafo
          </label>
          <input
              type="text"
              id="first-paragraph-title-input"
              value={firstParagraphTitle}
              onChange={(e) => setFirstParagraphTitle(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
              htmlFor="first-paragraph-description-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripción del Primer Párrafo
          </label>
          <RichTextEditor value={firstParagraphDescription} onChange={setFirstParagraphDescription} />
        </div>
        <div className="mb-5">
          <label
              htmlFor="first-paragraph-image1-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Imagen 1 del Primer Párrafo
          </label>
          <div className="flex items-center">
            <input
                type="file"
                id="first-paragraph-image1-input"
                onChange={(e) => handleFileChange(e, setFirstParagraphImage1, setFirstParagraphImagePreview1)}
                className="hidden"
            />
            <label
                htmlFor="first-paragraph-image1-input"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {offer && offer.firstParagraphImageUrl1 ? 'Editar imagen' : 'Seleccionar imagen'}
            </label>
            {firstParagraphImagePreview1 && (
                <div className="ml-4">
                  <Image
                      src={firstParagraphImagePreview1}
                      alt="Vista previa"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded border"
                  />
                </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label
              htmlFor="first-paragraph-image2-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Imagen 2 del Primer Párrafo
          </label>
          <div className="flex items-center">
            <input
                type="file"
                id="first-paragraph-image2-input"
                onChange={(e) => handleFileChange(e, setFirstParagraphImage2, setFirstParagraphImagePreview2)}
                className="hidden"
            />
            <label
                htmlFor="first-paragraph-image2-input"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {offer && offer.firstParagraphImageUrl2 ? 'Editar imagen' : 'Seleccionar imagen'}
            </label>
            {firstParagraphImagePreview2 && (
                <div className="ml-4">
                  <Image
                      src={firstParagraphImagePreview2}
                      alt="Vista previa"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded border"
                  />
                </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label
              htmlFor="second-paragraph-title-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Título del Segundo Párrafo
          </label>
          <input
              type="text"
              id="second-paragraph-title-input"
              value={secondParagraphTitle}
              onChange={(e) => setSecondParagraphTitle(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
              htmlFor="second-paragraph-description-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Descripción del Segundo Párrafo
          </label>
          <RichTextEditor value={secondParagraphDescription} onChange={setSecondParagraphDescription} />
        </div>
        <div className="mb-5">
          <label
              htmlFor="second-paragraph-image1-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Imagen 1 del Segundo Párrafo
          </label>
          <div className="flex items-center">
            <input
                type="file"
                id="second-paragraph-image1-input"
                onChange={(e) => handleFileChange(e, setSecondParagraphImage1, setSecondParagraphImagePreview1)}
                className="hidden"
            />
            <label
                htmlFor="second-paragraph-image1-input"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {offer && offer.secondParagraphImageUrl1 ? 'Editar imagen' : 'Seleccionar imagen'}
            </label>
            {secondParagraphImagePreview1 && (
                <div className="ml-4">
                  <Image
                      src={secondParagraphImagePreview1}
                      alt="Vista previa"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded border"
                  />
                </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label
              htmlFor="second-paragraph-image2-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Imagen 2 del Segundo Párrafo
          </label>
          <div className="flex items-center">
            <input
                type="file"
                id="second-paragraph-image2-input"
                onChange={(e) => handleFileChange(e, setSecondParagraphImage2, setSecondParagraphImagePreview2)}
                className="hidden"
            />
            <label
                htmlFor="second-paragraph-image2-input"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {offer && offer.secondParagraphImageUrl2 ? 'Editar imagen' : 'Seleccionar imagen'}
            </label>
            {secondParagraphImagePreview2 && (
                <div className="ml-4">
                  <Image
                      src={secondParagraphImagePreview2}
                      alt="Vista previa"
                      width={80}
                      height={80}
                      className="h-20 w-20 object-cover rounded border"
                  />
                </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Guardar'}
          </button>
          <Link
              href="/ruta-de-regreso"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Volver
          </Link>
        </div>
        {successMessage && (
            <div className="mt-4 text-green-500">{successMessage}</div>
        )}
      </form>
  );
};

OfferForm.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    bannerUrl: PropTypes.string,
    firstParagraphTitle: PropTypes.string,
    firstParagraphDescription: PropTypes.string,
    firstParagraphImageUrl1: PropTypes.string,
    firstParagraphImageUrl2: PropTypes.string,
    secondParagraphTitle: PropTypes.string,
    secondParagraphDescription: PropTypes.string,
    secondParagraphImageUrl1: PropTypes.string,
    secondParagraphImageUrl2: PropTypes.string,
  }),
};

export default OfferForm;


