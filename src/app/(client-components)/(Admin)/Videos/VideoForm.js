'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

const VideoForm = ({ video }) => {
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (video) {
            setTitle(video.title);
            setThumbnail(video.thumbnail);
        }
    }, [video]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');

        const videoData = {
            title,
            thumbnail,
        };

        try {
            const response = await fetch(`/api/video/${video ? video.id : ''}`, {
                method: video ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(videoData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccessMessage('¡Video guardado correctamente!');
                if (!video) {
                    setTitle('');
                    setThumbnail('');
                }
            } else {
                console.error('Error saving video:', response.statusText);
            }
        } catch (error) {
            console.error('Error saving video:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label
                    htmlFor="title-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Título
                </label>
                <input
                    type="text"
                    id="title-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="mb-5">
                <label
                    htmlFor="thumbnail-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Url del video
                </label>
                <input
                    type="text"
                    id="thumbnail-input"
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="flex items-center justify-between">
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Guardando...' : 'Guardar'}
                </button>
                <Link
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    href="/src/app/(client-components)/(Admin)/video"
                >
                    Volver
                </Link>
            </div>
            {successMessage && (
                <div className="mt-4 text-green-500">{successMessage}</div>
            )}
        </form>
    );
};

VideoForm.propTypes = {
    video: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        thumbnail: PropTypes.string,
    }),
};

export default VideoForm;
