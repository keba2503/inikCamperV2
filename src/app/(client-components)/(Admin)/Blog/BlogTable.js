'use client';

import React, {useEffect, useState, useCallback} from 'react';
import Link from 'next/link';
import axios from 'axios';
import {ArrowPathIcon, TrashIcon} from '@heroicons/react/24/solid';

const BlogTable = () => {
    const [blogs, setBlogs] = useState([]);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchBlogs = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/blog');
            const data = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleDelete = async (id, coverImageUrl, bodyImageUrl) => {
        const deleteImageFromCloudinary = async (imageId) => {
            try {
                const res = await axios.delete('/api/cloudinaryBlog', {
                    data: {public_id: imageId},
                });
                if (res.status !== 200) {
                    throw new Error(`Failed to delete image: ${res.data.message}`);
                }
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        };

        try {
            if (coverImageUrl) {
                await deleteImageFromCloudinary(coverImageUrl);
            }

            if (bodyImageUrl) {
                await deleteImageFromCloudinary(bodyImageUrl);
            }

            // Eliminar blog de la base de datos
            const response = await fetch(`/api/blog/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setFeedbackMessage('Blog deleted successfully.');
                fetchBlogs();
            } else {
                console.error('Error deleting blog:', response.statusText);
                setFeedbackMessage('Failed to delete blog.');
            }
            setTimeout(() => setFeedbackMessage(''), 3000);
        } catch (error) {
            console.error('Error deleting blog:', error);
            setFeedbackMessage('Failed to delete blog.');
            setTimeout(() => setFeedbackMessage(''), 3000);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-between p-2">
                <h2 className="text-lg font-medium text-gray-900">Blogs</h2>
                <button
                    onClick={fetchBlogs}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    <ArrowPathIcon className="h-5 w-5"/>
                </button>
            </div>
            {feedbackMessage && (
                <div
                    className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg"
                    role="alert"
                >
                    {feedbackMessage}
                </div>
            )}
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Title</th>
                    <th scope="col" className="px-6 py-3">Description</th>
                    <th scope="col" className="px-6 py-3">Article</th>
                    <th scope="col" className="px-6 py-3">Cover Image URL</th>
                    <th scope="col" className="px-6 py-3">Body Image URL</th>
                    <th scope="col" className="px-6 py-3">Action</th>
                </tr>
                </thead>
                <tbody>
                {blogs.map((blog) => (
                    <tr
                        key={blog.id}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            {truncateText(blog.title, 20)}
                        </th>
                        <td className="px-6 py-4">{truncateText(blog.description, 30)}</td>
                        <td className="px-6 py-4">{truncateText(blog.article, 50)}</td>
                        <td className="px-6 py-4">{truncateText(blog.coverImageUrl, 20)}</td>
                        <td className="px-6 py-4">{truncateText(blog.bodyImageUrl, 20)}</td>
                        <td className="px-6 py-4 flex space-x-2">
                            <Link
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                href={`/admin/blog/${blog.id}`}
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(blog.id, blog.coverImageUrl, blog.bodyImageUrl)}
                                className="text-red-600 hover:text-red-800"
                            >
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
                    <svg
                        className="animate-spin h-5 w-5 text-blue-500"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                </div>
            )}
        </div>
    );
};

export default BlogTable;
