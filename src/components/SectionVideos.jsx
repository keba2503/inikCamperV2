'use client';

import React, { useState, useEffect, useContext } from 'react';
import Heading from "@/shared/Heading";
import NcPlayIcon from "@/shared/NcPlayIcon";
import NcPlayIcon2 from "@/shared/NcPlayIcon2";
import Image from "next/image";
import PropTypes from 'prop-types';
import Link from 'next/link';
import ButtonPrimary from "@/shared/ButtonPrimary";
import { LanguageContext } from "@/context/LanguageContext";
import { translateText } from "@/utils/translate";

const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

const getThumbnailUrl = (url) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : url;
};

const SectionVideos = ({ className = "" }) => {
    const [videos, setVideos] = useState([]);
    const [isPlay, setIsPlay] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(0);
    const [translatedHeading, setTranslatedHeading] = useState("");
    const [translatedDesc, setTranslatedDesc] = useState("");
    const [translatedButton, setTranslatedButton] = useState("");

    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error('LanguageContext must be used within a LanguageProvider');
    }

    const { language } = context;

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/video');
                if (response.ok) {
                    const data = await response.json();
                    setVideos(data.slice(0, 6));
                } else {
                    console.error('Error fetching videos:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        const translateStaticContent = async () => {
            try {
                const buttonText = await translateText("Ver más videos", language);
                const heading = await translateText("🎬 Nuestros videos", language);
                const description = await translateText(
                    "Descubre nuestros videos más populares. ¡Todos son bienvenidos!",
                    language
                );
                setTranslatedHeading(heading);
                setTranslatedDesc(description);
                setTranslatedButton(buttonText);
            } catch (error) {
                console.error('Error translating static text:', error);
            }
        };

        fetchVideos();
        translateStaticContent();
    }, [language]);

    const renderMainVideo = () => {
        if (videos.length === 0) return null;
        const video = videos[currentVideo];
        const videoId = extractVideoId(video.thumbnail);
        return (
            <div
                className="group aspect-w-16 aspect-h-16 sm:aspect-h-9 bg-neutral-800 rounded-2xl overflow-hidden border-4 border-white dark:border-neutral-900 sm:rounded-[50px] sm:border-[10px] will-change-transform"
                title={video.title}
            >
                {isPlay && videoId ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <>
                        <div
                            onClick={() => setIsPlay(true)}
                            className="cursor-pointer absolute inset-0 flex items-center justify-center z-10"
                        >
                            <NcPlayIcon />
                        </div>

                        <Image
                            fill
                            className="object-cover w-full h-full transform transition-transform group-hover:scale-105 duration-300"
                            src={getThumbnailUrl(video.thumbnail)}
                            title={video.title}
                            alt={video.title}
                            sizes="(max-width: 1000px) 100vw,
                (max-width: 1200px) 75vw,
                50vw"
                        />
                    </>
                )}
            </div>
        );
    };

    const renderSubVideo = (video, index) => {
        if (index === currentVideo) return null;
        return (
            <div
                className="group relative aspect-h-16 aspect-w-16 rounded-2xl cursor-pointer overflow-hidden sm:aspect-h-12 sm:rounded-2xl lg:aspect-h-9"
                onClick={() => {
                    setCurrentVideo(index);
                    !isPlay && setIsPlay(true);
                }}
                title={video.title}
                key={String(index)}
            >
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <NcPlayIcon2 />
                </div>
                <Image
                    fill
                    className="object-cover w-full h-full transform transition-transform group-hover:scale-110 duration-300"
                    src={getThumbnailUrl(video.thumbnail)}
                    title={video.title}
                    alt={video.title}
                    sizes="(max-width: 300px) 100vw,
          (max-width: 1200px) 50vw,
          25vw"
                />
            </div>
        );
    };

    return (
        <div className={`nc-SectionVideos ${className} my-28`}>
            <Heading desc={translatedDesc}>
                {translatedHeading}
            </Heading>

            <div className="flex flex-col relative sm:pr-4 sm:py-4 md:pr-6 md:py-6 xl:pr-14 xl:py-14 lg:flex-row">
                <div
                    className="absolute -top-4 -bottom-4 -right-4 w-2/3 rounded-2xl bg-primary-100 bg-opacity-40 z-0 sm:rounded-[50px] md:top-0 md:bottom-0 md:right-0 xl:w-1/2 dark:bg-neutral-800 dark:bg-opacity-40"></div>
                <div className="flex-grow relative pb-2 sm:pb-4 lg:pb-0 lg:pr-5 xl:pr-6">
                    {renderMainVideo()}
                </div>
                <div className="flex-shrink-0 grid gap-2 grid-cols-4 sm:gap-6 lg:grid-cols-1 lg:w-36 xl:w-40">
                    {videos.map(renderSubVideo)}
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                <Link href="/video" passHref>
                    <ButtonPrimary
                        as="a"
                        fontSize="text-sm sm:text-base lg:text-lg font-medium"
                    >
                        {translatedButton}
                    </ButtonPrimary>
                </Link>
            </div>
        </div>
    );
};

SectionVideos.propTypes = {
    className: PropTypes.string,
};

export default SectionVideos;