'use client';

import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

interface Guide {
  question: string;
  answer: string;
}

const FaqAccordion: React.FC = () => {
  const [faqs, setFaqs] = useState<Guide[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetch('/api/faq');
        if (response.ok) {
          const data: Guide[] = await response.json();
          setFaqs(data);
        } else {
          console.error('Error fetching faqs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching faqs:', error);
      }
    };

    fetchGuides();
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto pt-12 p-6">
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b">
          <button
            className="text-neutral-800 w-full text-left flex justify-between items-center p-4 focus:outline-none"
            onClick={() => toggleAccordion(index)}
          >
            <span>{faq.question}</span>
            <svg
              className={`w-6 h-6 transform transition-transform ${
                activeIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          {activeIndex === index && (
            <div className="text-neutral-500 dark:text-neutral-300 pb-3 text-justify p-4">
              <div className="custom-html-styles">{parse(faq.answer)}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
