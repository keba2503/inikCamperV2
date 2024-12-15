"use client";

import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import Card12 from "./Card12";
import Card13 from "./Card13";
import {Blog, CloudinaryImage} from "@/data/types";
import SkeletonSectionMagazine5 from "@/components/SkeletonSectionMagazine5";
import {LanguageContext} from "@/context/LanguageContext";
import {translateText} from "@/utils/translate";

const SectionMagazine5: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [images, setImages] = useState<CloudinaryImage[]>([]);
    const [translatedBlogs, setTranslatedBlogs] = useState<Blog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("LanguageContext must be used within a LanguageProvider");
    }

    const {language} = context;

    const fetchBlogs = async () => {
        try {
            const response = await fetch("/api/blog");
            const data: Blog[] = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const fetchImages = async () => {
        try {
            const res = await axios.get("/api/cloudinaryBlog");
            const data: CloudinaryImage[] = res.data;
            setImages(data);
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchBlogs();
            await fetchImages();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const translateBlogs = async () => {
            try {
                const translations = await Promise.all(
                    blogs.map(async (blog) => ({
                        ...blog,
                        title: await translateText(blog.title, language),
                        description: await translateText(blog.description, language),
                    }))
                );
                setTranslatedBlogs(translations);
            } catch (error) {
                console.error("Error translating blogs:", error);
            }
        };

        if (blogs.length > 0) {
            translateBlogs();
        }
    }, [blogs, language]);

    const getImageUrl = (publicId: string) => {
        const image = images.find((img) => img.id === publicId);
        return image ? image.url : "";
    };

    const createMarkup = (html: string) => {
        return {__html: html};
    };

    return (
        <div className="nc-SectionMagazine5">
            {isLoading ? (
                <SkeletonSectionMagazine5/>
            ) : (
                <>
                    <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                        {translatedBlogs[0] && (
                            <Card12
                                post={{
                                    ...translatedBlogs[0],
                                    featuredImage: getImageUrl(translatedBlogs[0].coverImageUrl),
                                }}
                            />
                        )}
                        <div className="grid gap-6 md:gap-8">
                            {translatedBlogs.slice(1, 4).map((blog, index) => (
                                <Card13
                                    key={index}
                                    post={{
                                        ...blog,
                                        featuredImage: getImageUrl(blog.coverImageUrl),
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="mt-16">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                            {translatedBlogs.slice(4).map((blog, index) => (
                                <a
                                    key={index + 4}
                                    href={`/blog/${blog.id}`}
                                    className="flex flex-col items-center bg-white rounded-lg shadow md:flex-row md:max-w-3xl hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                                >
                                    <img
                                        className="object-cover w-full h-64 md:h-full md:w-64 rounded-t-lg md:rounded-none md:rounded-l-lg"
                                        src={getImageUrl(blog.coverImageUrl)}
                                        alt={blog.title}
                                    />
                                    <div className="flex flex-col justify-between p-4 leading-normal w-full">
                                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {blog.title}
                                        </h5>
                                        <div
                                            className="mb-3 font-normal text-gray-700 dark:text-gray-400"
                                            dangerouslySetInnerHTML={createMarkup(blog.description)}
                                        />
                                        <span className="text-sm text-gray-500">
                                            {new Date(blog.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default SectionMagazine5;