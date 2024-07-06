'use client';

import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ReviewForm from 'src/app/(client-components)/(Admin)/Review/ReviewForm';

const ReviewClient = ({ id }) => {
  const [review, setReview] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/review/${id}`);
          if (response.ok) {
            const data = await response.json();
            setReview(data);
          } else {
            console.error('Error fetching review:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching review:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchReview();
  }, [id]);

  return (
      <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
        <div className="w-full max-w-7xl">
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl md:text-3xl text-center flex-1">
              {review ? 'Edit Review' : 'Create Review'}
            </h1>
          </div>
          {isLoading ? <p>Loading...</p> : <ReviewForm review={review} />}
        </div>
      </main>
  );
};

ReviewClient.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ReviewClient;
