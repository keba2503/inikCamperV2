'use client';

import React, {useEffect, useState} from 'react';
import Image, {StaticImageData} from 'next/image';
import parse from 'html-react-parser';
import img from '../../images/Exteriores/1.jpg';
import img1 from '../../images/Exteriores/2.jpg';
import img2 from '../../images/Exteriores/3.jpg';
import img3 from '../../images/Exteriores/4.jpg';

export interface People {
    id: string;
    name: string;
    job: string;
    avatar: StaticImageData;
}

const FOUNDER_DEMO: People[] = [
    {
        id: '2',
        name: `Karen Borrero`,
        job: 'Co-founder',
        avatar: img2,
    },
    {
        id: '3',
        name: `Iria`,
        job: '',
        avatar: img1,
    },
    {
        id: '4',
        name: `Nauzet`,
        job: '',
        avatar: img,
    },
    {
        id: '1',
        name: `Isabel Soler`,
        job: 'Co-founder',
        avatar: img3,
    },
];

interface ConfigData {
    id: number;
    scope_id: number;
    title: string;
    subtitle: string;
    description: string;
    additional_text: string;
    updated_at: string;
}

const Page = () => {
    const [data, setData] = useState<ConfigData | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/config');
                const data: ConfigData[] = await response.json();

                const filteredData = data.find((item: ConfigData) => item.scope_id === 11);
                if (filteredData) {
                    setData(filteredData);
                    if (filteredData.subtitle) {
                        const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${filteredData.subtitle}.webp`;
                        setImageUrl(imageUrl);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="relative">
                <div className="min-h-screen bg-fixed bg-center bg-cover flex items-center" style={{backgroundImage: "url('https://via.placeholder.com/')"}}>
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div className="container mx-auto py-8 lg:py-28 space-y-16 lg:space-y-28 relative z-10 px-4 sm:px-6 lg:px-16 py-8 lg:rounded-2xl" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
                        <div className="animate-pulse flex space-x-4">
                            <div className="flex-1 space-y-4 py-1">
                                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-400 rounded"></div>
                                    <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return <div>No data found</div>;
    }

    return (
        <div className="relative">
            <div
                className="min-h-screen bg-fixed bg-center bg-cover flex items-center"
                style={{backgroundImage: `url('${imageUrl}')`}}
            >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="container mx-auto py-8 lg:py-28 space-y-16 lg:space-y-28 relative z-10 px-4 sm:px-6 lg:px-16 py-8 lg:rounded-2xl" style={{backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
                    <div className="nc-SectionFounder relative">
                        <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white pb-20">
                                {data.title}
                            </h2>
                            {parse(data.description || '')}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8 pt-10">
                            {FOUNDER_DEMO.map((item) => (
                                <div key={item.id} className="max-w-xs mx-auto">
                                    <div className="relative w-40 h-40 mx-auto lg:rounded-xl overflow-hidden">
                                        <Image
                                            src={item.avatar}
                                            alt={item.name}
                                            layout="fill"
                                            objectFit="cover"
                                            className="lg:rounded-xl"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200 text-center">
                                        {item.name}
                                    </h3>
                                    <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400 text-center">
                    {item.job}
                  </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
