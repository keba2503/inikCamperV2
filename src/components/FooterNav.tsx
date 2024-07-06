'use client';

import { HomeIcon, CalendarIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { PathName } from '@/routers/types';
import MenuBar from '@/shared/MenuBar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  link?: PathName;
  icon: React.ElementType;
}

const NAV: NavItem[] = [
  {
    name: 'Inicio',
    link: '/',
    icon: HomeIcon,
  },
  {
    name: 'Reservar',
    link: '/booking',
    icon: CalendarIcon,
  },
  {
    name: 'Menu',
    icon: MenuBar,
  },
];

const FooterNav = () => {
  const pathname = usePathname();

  const renderItem = (item: NavItem, index: number) => {
    const isActive = pathname === item.link;

    return item.link ? (
        <Link
            key={index}
            href={item.link}
            className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
            }`}
        >
          <item.icon className={`w-6 h-6 ${isActive ? 'text-red-600' : ''}`} />
          <span
              className={`text-[11px] leading-none mt-1 ${
                  isActive ? 'text-red-600' : ''
              }`}
          >
          {item.name}
        </span>
        </Link>
    ) : (
        <div
            key={index}
            className={`flex flex-col items-center justify-between text-neutral-500 dark:text-neutral-300/90 ${
                isActive ? 'text-neutral-900 dark:text-neutral-100' : ''
            }`}
        >
          <item.icon className="w-6 h-6" />
          <span className="text-[11px] leading-none mt-1">{item.name}</span>
        </div>
    );
  };

  return (
      <div className="FooterNav block md:!hidden p-2 bg-white dark:bg-neutral-800 fixed bottom-0 inset-x-0 z-30 border-t border-neutral-300 dark:border-neutral-700">
        <div className="w-full max-w-lg flex justify-around mx-auto text-sm text-center ">
          {/* MENU */}
          {NAV.map(renderItem)}
        </div>
      </div>
  );
};

export default FooterNav;
