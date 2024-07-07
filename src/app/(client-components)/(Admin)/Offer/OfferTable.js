import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';

const OfferTable = () => {
  const [offers, setOffers] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchOffers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/offer');
      setOffers(response.data);
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async (id, bannerUrl, firstImage, secondImage, secondParagraphImage1, secondParagraphImage2) => {
    const deleteImageFromCloudinary = async (public_id) => {
      try {
        const res = await axios.delete('/api/cloudinaryOffer', {
          data: { public_id },
        });
        if (res.status !== 200) {
          throw new Error(`Failed to delete image: ${res.data.message}`);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    };

    try {
      if (bannerUrl) {
        await deleteImageFromCloudinary(bannerUrl);
      }

      if (firstImage) {
        await deleteImageFromCloudinary(firstImage);
      }

      if (secondImage) {
        await deleteImageFromCloudinary(secondImage);
      }

      if (secondParagraphImage1) {
        await deleteImageFromCloudinary(secondParagraphImage1);
      }

      if (secondParagraphImage2) {
        await deleteImageFromCloudinary(secondParagraphImage2);
      }

      // Eliminar oferta de la base de datos
      const response = await axios.delete(`/api/offer/${id}`);

      if (response.status === 204) {
        setFeedbackMessage('Offer deleted successfully.');
        fetchOffers();
      } else {
        console.error('Error deleting offer:', response.statusText);
        setFeedbackMessage('Failed to delete offer.');
      }
      setTimeout(() => setFeedbackMessage(''), 3000);
    } catch (error) {
      console.error('Error deleting offer:', error);
      setFeedbackMessage('Failed to delete offer.');
      setTimeout(() => setFeedbackMessage(''), 3000);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text || '';

    return text.substring(0, maxLength) + '...';
  };

  return (
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex justify-between p-2">
          <h2 className="text-lg font-medium text-gray-900">Offers</h2>
          <button
              onClick={fetchOffers}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Refresh
          </button>
        </div>
        {feedbackMessage && (
            <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
              {feedbackMessage}
            </div>
        )}
        <div className="min-w-full overflow-hidden overflow-x-auto align-middle sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subtitle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Paragraph Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Paragraph Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Paragraph Image 1
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                First Paragraph Image 2
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Second Paragraph Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Second Paragraph Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Second Paragraph Image 1
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Second Paragraph Image 2
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            {offers.map((offer) => (
                <tr key={offer.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{truncateText(offer.title, 20)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truncateText(offer.subtitle, 30)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truncateText(offer.firstParagraphTitle, 50)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truncateText(offer.firstParagraphDescription, 50)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truncateText(offer.firstParagraphImageUrl1, 30)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truncateText(offer.firstParagraphImageUrl2, 30)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truncateText(offer.secondParagraphTitle, 50)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truncateText(offer.secondParagraphDescription, 50)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truncateText(offer.secondParagraphImageUrl1, 30)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{truncateText(offer.secondParagraphImageUrl2, 30)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex space-x-2">
                    <Link href={`/admin/offer/${offer.id}`} passHref>
                      Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(offer.id, offer.bannerUrl, offer.firstParagraphImageUrl1, offer.firstParagraphImageUrl2, offer.secondParagraphImageUrl1, offer.secondParagraphImageUrl2)}
                        className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
          {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
                <svg className="animate-spin h-5 w-5 text-blue-500" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              </div>
          )}
        </div>
      </div>
  );
};

export default OfferTable;
