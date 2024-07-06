'use client';

import React from "react";
import { TagIcon, BanknotesIcon, CursorArrowRaysIcon } from '@heroicons/react/24/outline';

const OfferBanner = () => {

    const handleBannerClick = () => {
        window.location.href = '/offer';
    };

    return (
        <div
            className="relative bg-gradient-to-r from-yellow-100 to-yellow-500 text-white p-4 rounded-2xl shadow-lg cursor-pointer flex items-center justify-between"
            onClick={handleBannerClick}
            style={{padding: '20px 40px'}}
        >
            <div className="flex items-center">
                <span className="text-3xl md:text-4xl font-bold text-red-600 flex items-center">
                    Descuento residente
                    <BanknotesIcon className="h-8 w-8 text-black ml-2 animate-wave" />
                </span>
            </div>
            <div className="text-right flex items-center">
                <span className="text-3xl md:text-4xl font-bold text-red-600">Ahorra 5%</span>
                <TagIcon className="h-8 w-8 text-black ml-2 animate-wave" />
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center">
                <CursorArrowRaysIcon className="h-6 w-6 text-black animate-wave mr-2" />
                <span className="text-lg font-bold text-black">Click</span>
            </div>
        </div>
    );
};

export default OfferBanner;
