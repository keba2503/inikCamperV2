'use client';

import React from "react";
import { TagIcon, BanknotesIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';

const OfferBanner = () => {

    const handleBannerClick = () => {
        window.location.href = '/offer';
    };

    return (
        <div
            className="relative bg-gradient-to-r from-yellow-100 to-yellow-300 text-white p-4 shadow-lg cursor-pointer flex flex-col md:flex-row items-center justify-between rounded-t-none rounded-bl-2xl rounded-br-2xl"
            onClick={handleBannerClick}
        >
            <div className="flex items-center mb-2 md:mb-0">
                <span className="text-xl md:text-3xl font-bold text-red-600 flex items-center">
                    Descuento residente
                    <BanknotesIcon className="h-5 w-5 md:h-8 md:w-8 text-black ml-2 animate-wave" />
                </span>
            </div>
            <div className="flex items-center mb-2 md:mb-0">
                <span className="text-xl md:text-3xl font-bold text-red-600">Ahorra 5%</span>
                <TagIcon className="h-5 w-5 md:h-8 md:w-8 text-black ml-2 animate-wave" />
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center md:hidden">
                <CursorArrowRaysIcon className="h-4 w-4 md:h-6 md:w-6 text-black animate-wave mr-2" />
                <span className="text-sm md:text-lg font-bold text-black">Click</span>
            </div>
        </div>
    );
};

export default OfferBanner;
