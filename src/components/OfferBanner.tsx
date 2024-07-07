'use client';

import React, {useEffect, useState} from "react";
import {TagIcon, BanknotesIcon, CursorArrowRaysIcon} from '@heroicons/react/24/outline';

interface ConfigData {
    id: number;
    scope_id: number;
    title: string;
    subtitle: string;
    description: string;
    additional_text: string;
    updated_at: string;
}

const Skeleton = () => {
    return (
        <div className="animate-pulse flex flex-col space-y-4 p-4 bg-gradient-to-r from-yellow-100 to-yellow-300 text-white shadow-lg rounded-t-none rounded-bl-2xl rounded-br-2xl">
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
        </div>
    );
};

const OfferBanner = () => {
    const [data, setData] = useState<{ title: string; description: string }>({title: '', description: ''});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/config')
            .then(response => response.json())
            .then((data: ConfigData[]) => {
                const filteredData = data.find((item: ConfigData) => item.scope_id === 13);
                if (filteredData) {
                    setData({
                        title: filteredData.title,
                        description: filteredData.description
                    });
                }
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    const handleBannerClick = () => {
        window.location.href = '/offer';
    };

    if (loading) {
        return <Skeleton/>;
    }

    return (
        <div
            className="relative bg-gradient-to-r from-yellow-100 to-yellow-300 text-white p-4 shadow-lg cursor-pointer flex flex-col md:flex-row items-center justify-between rounded-t-none rounded-bl-2xl rounded-br-2xl"
            onClick={handleBannerClick}
        >
            <div className="flex items-center mb-2 md:mb-0">
                <span className="text-xl md:text-3xl font-bold text-red-600 flex items-center">
                    {data.title}
                    <BanknotesIcon className="h-5 w-5 md:h-8 md:w-8 text-black ml-2 animate-wave"/>
                </span>
            </div>
            <div className="flex items-center mb-2 md:mb-0">
                <span className="text-xl md:text-3xl font-bold text-red-600">{data.description}</span>
                <TagIcon className="h-5 w-5 md:h-8 md:w-8 text-black ml-2 animate-wave"/>
            </div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center">
                <CursorArrowRaysIcon className="h-4 w-4 md:h-6 md:w-6 text-black animate-wave mr-2"/>
                <span className="text-sm md:text-lg font-bold text-black">Click</span>
            </div>
        </div>
    );
};

export default OfferBanner;
