'use client';

import { useEffect } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { language: 'es' };
const { useGlobalState } = createGlobalState(initialState);

export const useLanguageMode = () => {
  const [language, setLanguage] = useGlobalState('language');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      localStorage.setItem('language', 'es');
    }
  }, [setLanguage]);

  const switchLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return {
    language,
    switchLanguage,
  };
};
