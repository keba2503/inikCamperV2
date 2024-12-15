"use client";

import React, {useEffect, useState, useContext} from "react";
import parse, {domToReact} from "html-react-parser";
import {LanguageContext} from "@/context/LanguageContext";
import {translateText} from "@/utils/translate";

const Skeleton = () => {
    return (
        <div className="animate-pulse flex flex-col space-y-4">
            <div className="h-10 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
            <div className="h-20 bg-gray-300 rounded w-full mx-auto"></div>
            <div className="h-20 bg-gray-300 rounded w-full mx-auto"></div>
            <div className="h-20 bg-gray-300 rounded w-full mx-auto"></div>
        </div>
    );
};

const PageAbout = () => {
    const [data, setData] = useState(null);
    const [translatedData, setTranslatedData] = useState({title: "", description: ""});
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("LanguageContext must be used within a LanguageProvider");
    }

    const {language} = context;

    useEffect(() => {
        fetch("/api/config")
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.find((item) => item.scope_id === 1);
                if (filteredData) {
                    setData(filteredData);
                    if (filteredData.subtitle) {
                        const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${filteredData.subtitle}.webp`;
                        setImageUrl(imageUrl);
                    }
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const translateContent = async () => {
            if (!data) return;
            try {
                const translatedTitle = await translateText(data.title, language);
                const translatedDescription = await translateText(data.description, language);
                setTranslatedData({
                    title: translatedTitle,
                    description: translatedDescription,
                });
            } catch (error) {
                console.error("Error translating content:", error);
            }
        };

        if (data) {
            translateContent();
        }
    }, [data, language]);

    if (loading) {
        return (
            <div className="relative">
                <div
                    className="min-h-screen bg-fixed bg-center bg-cover flex items-center"
                    style={{backgroundImage: "url('https://via.placeholder.com/1500x800')"}}
                >
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div
                        className="container mx-auto py-8 lg:py-28 space-y-16 lg:space-y-28 relative z-10 px-4 sm:px-6 lg:px-16 py-8 lg:rounded-2xl"
                        style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}
                    >
                        <Skeleton/>
                    </div>
                </div>
            </div>
        );
    }

    if (!data) {
        return <div>No data found.</div>;
    }

    const parsedDescription = parse(translatedData.description, {
        replace: (domNode) => {
            if (domNode.name === "p") {
                return <p className="text-justify">{domToReact(domNode.children)}</p>;
            }
        },
    });

    return (
        <div className="relative">
            <div
                className="h-screen bg-fixed bg-center bg-cover flex items-center"
                style={{backgroundImage: `url('${imageUrl}')`}}
            >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div
                    className="container mx-auto py-4 lg:py-16 space-y-10 lg:space-y-16 relative z-10 px-6 sm:px-8 lg:px-16 py-8 lg:rounded-2xl"
                    style={{
                        marginTop: "30vh",
                        backgroundColor: "rgba(255, 255, 255, 0.8)",
                    }}
                >
                    <div className="nc-SectionFounder relative">
                        <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-black">
                                {translatedData.title}
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