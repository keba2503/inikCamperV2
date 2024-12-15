'use client';

import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface LanguageContextType {
    language: string;
    switchLanguage: (newLanguage: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined,
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
                                                                        children,
                                                                    }) => {
    const [language, setLanguage] = useState<string>('en');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        setLanguage(savedLanguage);
    }, []);

    const switchLanguage = (newLanguage: string) => {
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);
    };

    return (
        <LanguageContext.Provider value={{ language, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};
