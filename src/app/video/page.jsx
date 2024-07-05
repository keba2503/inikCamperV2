'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';
import NcPlayIcon2 from "../../shared/NcPlayIcon2";

// Extract video ID from YouTube URL
const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:shorts\/|watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

// Get the thumbnail URL for a YouTube video
const getThumbnailUrl = (url) => {
    const videoId = extractVideoId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : url;
};

const VideoGallery = () => {
    const [videos, setVideos] = useState([]);
    const [activeVideo, setActiveVideo] = useState(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get('/api/video');
                setVideos(res.data);
                if (res.data.length > 0) {
                    setActiveVideo(res.data[0]);
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <>
            <div className="max-w-screen-lg mx-auto space-y-5 pt-10 text-center">
                <h1
                    className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl"
                    title="Nuestros Videos"
                >
                    Nuestros Videos
                </h1>
            </div>
            <div className="w-full max-w-6xl mx-auto pt-12 p-6 pb-20">
                <div className="mb-4">
                    {activeVideo && (
                        <div className="relative aspect-w-16 aspect-h-9 bg-neutral-800 rounded-lg overflow-hidden">
                            <iframe
                                src={`https://www.youtube.com/embed/${extractVideoId(activeVideo.thumbnail)}?autoplay=1`}
                                title={activeVideo.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        </div>
                    )}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                    {videos.map(({ id, thumbnail, title }) => (
                        <div
                            key={id}
                            className="relative cursor-pointer"
                            onClick={() => setActiveVideo({ thumbnail, title })}
                        >
                            <Image
                                src={getThumbnailUrl(thumbnail)}
                                className={`h-22 w-full rounded-lg object-cover object-center transition-transform duration-200 ${
                                    activeVideo && activeVideo.thumbnail === thumbnail
                                        ? 'ring-4 ring-blue-500 transform scale-105 p-2'
                                        : ''
                                }`}
                                alt={title}
                                width={240}
                                height={160}
                            />
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                <NcPlayIcon2 />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default VideoGallery;
