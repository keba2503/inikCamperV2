'use client';

import React, { useEffect, useState } from "react";
import SectionHero from "./SectionHero";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import rightImg from "@/images/about-hero-right.png";
import parse, { domToReact } from 'html-react-parser';

const PageAbout = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/config')
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.find(
                    (item) => item.scope_id === 1
                );
                setData(filteredData || null);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data found.</div>;
    }

    const parsedDescription = parse(data.description, {
        replace: (domNode) => {
            if (domNode.name === 'p') {
                return <p className="text-justify">{domToReact(domNode.children)}</p>;
            }
        }
    });

    return (
        <div className="relative">
            <div
                className="h-screen bg-fixed bg-center bg-cover flex items-center"
                style={{ backgroundImage: "url('https://rvdmediagroup.com/wp-content/uploads/2018/01/Roque-Nublo1.jpg')" }}
            >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="container mx-auto py-4 lg:py-16 space-y-10 lg:space-y-16 relative z-10 px-6 sm:px-8 lg:px-16 py-8 rounded-2xl" style={{ marginTop: '30vh', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <div className="nc-SectionFounder relative">
                        <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-black">
                                {data.title}
                            </h2>
                            {parsedDescription}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageAbout;
