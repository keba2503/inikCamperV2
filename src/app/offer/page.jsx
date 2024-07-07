'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import InfoSection from './InfoSection';
import InfoSectionRight from './InfoSectionRight';
import OfferGallery from './OfferGallery';
import ModalButton from './ModalButton';

const HeroSection = () => {
    const [offer, setOffer] = useState(null);
    const [bannerUrl, setBannerUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const offerResponse = await fetch('/api/offer');
                const offerData = await offerResponse.json();
                const offer = offerData[0];

                const cloudinaryResponse = await fetch('/api/cloudinaryOffer');
                const cloudinaryData = await cloudinaryResponse.json();
                const bannerUrl = cloudinaryData.find(item => item.id === offer.bannerUrl).url;

                setOffer(offer);
                setBannerUrl(bannerUrl);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!offer) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
                <div className="fixed top-0 left-0 w-full h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[30rem] z-10">
                    <Image
                        src={bannerUrl}
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className=""
                        alt="Background image"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute top-4 left-4 z-20">
                        <Link href="/" passHref className="text-white bg-gray-800 hover:bg-gray-600 rounded-full p-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                        </Link>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                                {offer.title}
                            </h1>
                            <div className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 xl:px-48" dangerouslySetInnerHTML={{ __html: offer.subtitle }} />
                        </div>
                    </div>
                    <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 z-20">
                        <ModalButton />
                    </div>
                </div>
            </div>
            <div className="container px-1 sm:px-4 mb-24 mt-[25rem] sm:mt-[30rem] md:mt-[30rem] lg:mt-[30rem] xl:mt-[30rem] relative z-0">
                <InfoSection />
                <InfoSectionRight />
                <OfferGallery />
            </div>
        </div>
    );
};

export default HeroSection;
