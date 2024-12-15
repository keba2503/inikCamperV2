"use client";

import React, {useEffect, useState, useContext} from "react";
import parse from "html-react-parser";
import PropTypes from "prop-types";
import {LanguageContext} from "@/context/LanguageContext";
import {translateText} from "@/utils/translate";

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
        <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    const [data, setData] = useState<ConfigData | null>(null);
    const [translatedData, setTranslatedData] = useState({title: "", description: ""});
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);

    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("LanguageContext must be used within a LanguageProvider");
    }

    const {language} = context;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/config");
                const data: ConfigData[] = await response.json();

                const filteredData = data.find((item: ConfigData) => item.scope_id === 12);
                if (filteredData) {
                    setData(filteredData);
                    if (filteredData.subtitle) {
                        const imageUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${filteredData.subtitle}.webp`;
                        setImageUrl(imageUrl);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
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
                    className="h-screen bg-fixed bg-center bg-cover flex items-center"
                    style={{backgroundImage: "url('https://via.placeholder.com/1500x800')"}}
                >
                    <div className="absolute inset-0 bg-black opacity-10"></div>
                    <div
                        className="container mx-auto py-4 lg:py-16 space-y-10 lg:space-y-16 relative z-10 px-6 sm:px-8 lg:px-16 py-8 lg:rounded-2xl mt-10 lg:mt-32"
                        style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}
                    >
                        <Skeleton/>
                        <Skeleton/>
                        <Skeleton/>
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
                className="h-screen bg-fixed bg-center bg-cover flex items-center"
                style={{backgroundImage: `url('${imageUrl}')`}}
            >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div
                    className="container mx-auto py-4 lg:py-16 space-y-10 lg:space-y-16 relative z-10 px-6 sm:px-8 lg:px-16 py-8 lg:rounded-2xl mt-10 lg:mt-32"
                    style={{backgroundColor: "rgba(255, 255, 255, 0.8)"}}
                >
                    <div className="nc-SectionFounder relative">
                        <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-black">
                                {translatedData.title}
                            </h2>
                            {parse(translatedData.description || "")}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Page.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number,
        scope_id: PropTypes.number,
        title: PropTypes.string,
        subtitle: PropTypes.string,
        description: PropTypes.string,
        additional_text: PropTypes.string,
        updated_at: PropTypes.string,
    }),
    imageUrl: PropTypes.string,
    loading: PropTypes.bool,
};

export default Page;