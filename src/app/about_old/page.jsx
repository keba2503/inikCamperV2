'use client';

import React, { useEffect, useState } from "react";
import SectionFounder from "./SectionFounder";
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

    const parsedAdditionalText = parse(data.additional_text, {
        replace: (domNode) => {
            if (domNode.name === 'p') {
                return <p className="text-justify text-gray-600 mt-[-4]">{domToReact(domNode.children)}</p>;
            }
            if (domNode.name === 'blockquote') {
                return <blockquote className="text-justify pl-4 border-l-4 border-gray-500">{domToReact(domNode.children)}</blockquote>;
            }
            if (domNode.name === 'li') {
                return <li className="ml-4 list-disc">{domToReact(domNode.children)}</li>;
            }
        }
    });

    return (
        <div className="nc-PageAbout overflow-hidden relative">
            {/* ======== BG GLASS ======== */}
            <BgGlassmorphism />

            <div className="container py-8 lg:py-28 space-y-16 lg:space-y-28">
                <SectionHero
                    rightImg={rightImg}
                    heading={data.title}
                    btnText=""
                    subHeading={parsedDescription}
                />
                <div className="relative py-1 mt-[-4]">
                    <div className="text-gray-600">{parsedAdditionalText}</div>
                </div>
                <SectionFounder />
            </div>
        </div>
    );
};

export default PageAbout;
