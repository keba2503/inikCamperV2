'use client';

import React, { FC, useState, useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import parse from 'html-react-parser';
import Loading from '@/components/loading/Loading';

interface ApiResponse {
  scope_id: number;
  title: string;
  description: string;
  additional_text: string;
}

export interface BookingPageProps {}

const BookingSuccess: FC<BookingPageProps> = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/config')
      .then((response) => response.json())
      .then((data) => {
        const filteredData = data.find(
          (item: ApiResponse) => item.scope_id === 2,
        );
        setData(filteredData || null);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No data found
      </div>
    );
  }

  return (
    <main className="nc-PageHome relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex items-center justify-center">
      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        <div className="text-center py-16 bg-white shadow-lg rounded-lg p-8">
          <CheckCircleIcon className="h-16 w-16 text-primary-500 mx-auto mb-4 animate-bounce" />
          <h1 className="text-5xl font-bold text-primary-500 mb-4">
            {parse(data.title)}
          </h1>
          <p className="text-xl">{parse(data.description)}</p>
          <p className="text-lg mt-2">{parse(data.additional_text)}</p>
          <div className="mt-8">
            <a
              href="/guide"
              className="inline-block px-8 py-4 bg-primary-500 text-white font-semibold rounded-full shadow-lg hover:bg-primary-600 transition-transform transform hover:scale-105"
            >
              Ir a la guia del huesped
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookingSuccess;
