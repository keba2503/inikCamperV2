'use client';

import React, { useEffect, useState } from 'react';
import CardCategory6 from '@/components/CardCategory6';
import Booking from '@/app/bookinHead/page';
import Heading from '@/shared/Heading';
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces';
import { TaxonomyType } from '@/data/types';
import parse from 'html-react-parser';
import {Route} from "next";

interface ApiResponse {
    id: number;
    scope_id: number;
    title: string;
    description: string;
    subtitle: string | null;
}

interface ImageResponse {
    id: string;
    url: string;
}

const Services: React.FC = () => {
    const [data, setData] = useState<ApiResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [images, setImages] = useState<ImageResponse[]>([]);
    const [header, setHeader] = useState<{
        title: string;
        description: string;
    } | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/api/config');
                const configData = await response.json();

                const filteredServices = configData.filter(
                    (item: ApiResponse) => item.scope_id === 4,
                );
                const headerData = configData.find(
                    (item: ApiResponse) => item.scope_id === 10,
                );

                setHeader(
                    headerData
                        ? { title: headerData.title, description: headerData.description }
                        : null,
                );
                setData(filteredServices);
            } catch (error) {
                console.error('Error fetching config data:', error);
            }
        };

        const fetchImages = async () => {
            try {
                const response = await fetch('/api/cloudinaryService');
                const imageData = await response.json();
                setImages(imageData);
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };

        fetchConfig();
        fetchImages();
        setLoading(false);
    }, []);

    const getImageUrl = (subtitle: string | null) => {
        if (!subtitle) return '';
        const image = images.find((img) =>
            img.id.toLowerCase().includes(subtitle!.toLowerCase()),
        );
        return image ? image.url : '';
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const transformedData: TaxonomyType[] = data.map(service => ({
        id: service.id.toString(),
        href: "/services" as unknown as Route,  // Adjust this as per your Route type
        name: service.title,
        taxonomy: "category",
        count: 188288, // Este valor es estático, puedes adaptarlo si tienes el conteo real.
        thumbnail: getImageUrl(service.subtitle),
    }));

    return (
        <main className="nc-PageHome3 relative overflow-hidden">
            <div className="container relative space-y-24 mb-24 pt-12">
                {header && (
                    <Heading desc={parse(header.description)}>
                        {header.title}
                    </Heading>
                )}
                <div className="grid grid-cols-12 gap-6">
                    {transformedData.slice(0, 1).map((taxonomy, index) => (
                        <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
                            <CardCategory6 taxonomy={taxonomy} />
                        </div>
                    ))}
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
                        {transformedData.slice(1, 3).map((taxonomy, index) => (
                            <CardCategory6 key={index} taxonomy={taxonomy} />
                        ))}
                    </div>
                    {transformedData.slice(3, 4).map((taxonomy, index) => (
                        <div key={index} className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
                            <CardCategory6 taxonomy={taxonomy} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="container px-1 sm:px-4 mb-24">
                <h3 className="text-center text-2xl font-bold mb-4">Reserva aquí</h3>
                <Booking />
                <SectionGridFeaturePlaces cardType="card2" />
            </div>
        </main>
    );
};

export default Services;
