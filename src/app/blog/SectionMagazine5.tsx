'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card12 from './Card12';
import Card13 from './Card13';
import { Blog, CloudinaryImage } from '@/data/types';

const SectionMagazine5: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [images, setImages] = useState<CloudinaryImage[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/blog');
            const data: Blog[] = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchImages = async () => {
        try {
            const res = await axios.get('/api/cloudinaryBlog');
            const data: CloudinaryImage[] = res.data;
            setImages(data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchBlogs();
        fetchImages();
    }, []);

    const getImageUrl = (publicId: string) => {
        const image = images.find(img => img.id === publicId);
        return image ? image.url : '';
    };

    return (
        <div className="nc-SectionMagazine5">
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                    {blogs[0] && (
                        <Card12
                            post={{
                                ...blogs[0],
                                featuredImage: getImageUrl(blogs[0].coverImageUrl),
                            }}
                        />
                    )}
                    <div className="grid gap-6 md:gap-8">
                        {blogs.slice(1, 4).map((blog, index) => (
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
            )}
        </div>
    );
};

export default SectionMagazine5;
