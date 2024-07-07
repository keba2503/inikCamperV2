import { useState, useEffect } from 'react';
import Image from 'next/image';

const InfoSectionRight = () => {
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
                const firstImage = cloudinaryData.find(item => item.id === offer.secondParagraphImageUrl1).url;
                const secondImage = cloudinaryData.find(item => item.id === offer.secondParagraphImageUrl2).url;

                setData(offer);
                setImageUrls({ firstImage, secondImage });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 mt-8 lg:mt-0">
                    <div className="relative w-full h-64 mb-6 lg:mb-0">
                        <Image
                            className="w-full rounded-lg"
                            src={imageUrls.firstImage}
                            alt="office content 1"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="relative w-full h-64 mt-4 lg:mt-10 mb-6 lg:mb-0">
                        <Image
                            className="w-full rounded-lg"
                            src={imageUrls.secondImage}
                            alt="office content 2"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className="order-1 lg:order-2 font-light text-gray-500 sm:text-lg dark:text-gray-400 mt-6 lg:mt-0">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {data.secondParagraphTitle}
                    </h2>
                    <div className="mt-10 mb-4 text-justify" dangerouslySetInnerHTML={{ __html: data.secondParagraphDescription }} />
                </div>
            </div>
        </section>
    );
};

export default InfoSectionRight;
