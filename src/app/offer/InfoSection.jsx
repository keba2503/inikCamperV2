import { useState, useEffect } from 'react';
import Image from 'next/image';

const InfoSection = () => {
    const [data, setData] = useState(null);
    const [imageUrls, setImageUrls] = useState({ firstImage: '', secondImage: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offerResponse = await fetch('/api/offer');
                const offerData = await offerResponse.json();
                const offer = offerData[0];

                const cloudinaryResponse = await fetch('/api/cloudinaryOffer');
                const cloudinaryData = await cloudinaryResponse.json();
                const firstImage = cloudinaryData.find(item => item.id === offer.firstParagraphImageUrl1).url;
                const secondImage = cloudinaryData.find(item => item.id === offer.firstParagraphImageUrl2).url;

                setData(offer);
                setImageUrls({ firstImage, secondImage });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return (
            <section className="bg-white dark:bg-gray-900">
                <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6 animate-pulse">
                    <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                        <div className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white bg-gray-300 dark:bg-gray-700 h-10 rounded"></div>
                        <div className="mb-4 mt-10 text-justify bg-gray-300 dark:bg-gray-700 h-24 rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">
                        <div className="relative w-full h-64 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                        <div className="relative w-full h-64 mt-4 lg:mt-10 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {data.firstParagraphTitle}
                    </h2>
                    <div className="mb-4 mt-10 text-justify" dangerouslySetInnerHTML={{ __html: data.firstParagraphDescription }} />
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="relative w-full h-64">
                        <Image
                            className="w-full rounded-lg"
                            src={imageUrls.firstImage}
                            alt="office content 1"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="relative w-full h-64 mt-4 lg:mt-10">
                        <Image
                            className="w-full rounded-lg"
                            src={imageUrls.secondImage}
                            alt="office content 2"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
