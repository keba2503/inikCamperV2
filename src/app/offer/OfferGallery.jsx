'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';

const OfferGallery = () => {
    const [gallery, setGallery] = useState([]);
    const [active, setActive] = useState('');

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('/api/cloudinaryOfferGallery');
                setGallery(res.data);
                if (res.data.length > 0) {
                    setActive(res.data[0].url);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchImages();
    }, []);

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((image, index) => (
                <div key={index}>
                    <div className="relative w-full h-64">
                        <Image
                            className="h-auto max-w-full rounded-lg"
                            src={image.url}
                            alt={`Gallery image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OfferGallery;
