'use client';

import React, { useEffect, useState, useContext } from 'react';
import NavigationItem from './NavigationItem';
import { NAVIGATION_DEMO } from '@/data/navigation';
import { LanguageContext } from '@/context/LanguageContext';
import { translateText } from '@/utils/translate';
import { NavItemType } from '@/shared/Navigation/NavigationItem';

const Navigation: React.FC = () => {
  const [translatedNavItems, setTranslatedNavItems] =
      useState<NavItemType[]>(NAVIGATION_DEMO);
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error('LanguageContext must be used within a LanguageProvider');
  }

  const { language } = context;

  useEffect(() => {
    const translateNavItems = async () => {
      try {
        const translatedItems = await Promise.all(
            NAVIGATION_DEMO.map(async (item) => {
              const translatedName = await translateText(item.name, language);

              let translatedChildren: NavItemType[] = [];

              if (item.children) {
                translatedChildren = await Promise.all(
                    item.children.map(async (child) => {
                      const translatedChildName = await translateText(
                          child.name,
                          language,
                      );
                      return {
                        ...child,
                        name: translatedChildName,
                      };
                    }),
                );
              }

              return {
                ...item,
                name: translatedName,
                children: translatedChildren,
              };
            }),
        );

        setTranslatedNavItems(translatedItems);
      } catch (error) {
        console.error('Error translating navigation items:', error);
      }
    };

    translateNavItems();
  }, [language]);

  return (
      <ul className="nc-Navigation hidden lg:flex lg:flex-wrap lg:space-x-1 relative">
        {translatedNavItems.map((item) => (
            <NavigationItem key={item.id} menuItem={item} />
        ))}
      </ul>
  );
};

export default Navigation;
