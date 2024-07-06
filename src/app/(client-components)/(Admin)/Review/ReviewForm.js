'use client';

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import axios from 'axios';
import Image from 'next/image';

const RichTextEditor = dynamic(() => import('@/components/RichTextEditor'), {
  ssr: false,
});

const ReviewForm = ({ review }) => {
  const [username, setUsername] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('');
  const [product, setProduct] = useState('');
  const [avatarImage, setAvatarImage] = useState(null);
  const [avatarImagePreview, setAvatarImagePreview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (review) {
      setUsername(review.username || '');
      setComment(review.comment || '');
      setRating(review.rating || '');
      setProduct(review.product || '');
      if (review.avatarUrl) {
        const avatarImageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${review.avatarUrl}.webp`;
        setAvatarImagePreview(avatarImageUrl);
      }
    }
  }, [review]);

  const handleFileChange = (e, setImage, setImagePreview) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');

    let avatarImageName = review ? review.avatarUrl : '';

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

    if (avatarImage) {
      if (review && review.avatarUrl) {
        try {
          await axios.delete('/api/cloudinaryReview', {
            data: { public_id: review.avatarUrl },
          });
        } catch (error) {
          console.error('Error deleting the previous avatar image:', error);
        }
      }
      try {
        avatarImageName = await uploadImage(avatarImage, 'inikcamper/review');
      } catch (error) {
        return;
      }
    }

    const reviewData = {
      username,
      comment,
      rating: parseInt(rating, 10),  // Ensure rating is an integer
      product,
      avatarUrl: avatarImageName,
    };

    try {
      const response = await fetch(`/api/review${review ? `/${review.id}` : ''}`, {
        method: review ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        await response.json();
        setSuccessMessage('¡Review guardada correctamente!');
        if (!review) {
          setUsername('');
          setComment('');
          setRating('');
          setProduct('');
          setAvatarImage(null);
          setAvatarImagePreview('');
        }
      } else {
        console.error('Error saving review:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving review:', error);
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
              htmlFor="username-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Cliente
          </label>
          <input
              type="text"
              id="username-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
              htmlFor="comment-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Comentario
          </label>
          <RichTextEditor value={comment} onChange={setComment} />
        </div>
        <div className="mb-5">
          <label
              htmlFor="rating-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Rating
          </label>
          <input
              type="number"
              id="rating-input"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
              htmlFor="product-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Fecha
          </label>
          <input
              type="text"
              id="product-input"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-5">
          <label
              htmlFor="avatar-image-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Avatar Image URL
          </label>
          <div className="flex items-center">
            <input
                type="file"
                id="avatar-image-input"
                onChange={(e) => handleFileChange(e, setAvatarImage, setAvatarImagePreview)}
                className="hidden"
            />
            <label
                htmlFor="avatar-image-input"
                className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {review && review.avatarUrl ? 'Edit Image' : 'Select Image'}
            </label>
            {avatarImagePreview && (
                <div className="ml-4">
                  <Image
                      src={avatarImagePreview}
                      alt="Preview"
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
            {isSubmitting ? 'Saving...' : 'Save'}
          </button>
          <Link
              href="/src/app/(client-components)/(Admin)/review"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Back
          </Link>
        </div>
        {successMessage && (
            <div className="mt-4 text-green-500">{successMessage}</div>
        )}
      </form>
  );
};

ReviewForm.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    comment: PropTypes.string,
    rating: PropTypes.number,
    product: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

export default ReviewForm;
