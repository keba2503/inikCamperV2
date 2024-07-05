'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card12 from './Card12';
import Card13 from './Card13';
import { Blog, CloudinaryImage } from '@/data/types';
import SkeletonSectionMagazine5 from '@/components/SkeletonSectionMagazine5';

const SectionMagazine5: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [images, setImages] = useState<CloudinaryImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/blog');
            const data: Blog[] = await response.json();
            setBlogs(data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
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
        const fetchData = async () => {
            await fetchBlogs();
            await fetchImages();
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const getImageUrl = (publicId: string) => {
        const image = images.find(img => img.id === publicId);
        return image ? image.url : '';
    };

    return (
        <div className="nc-SectionMagazine5">
            {isLoading ? (
                <SkeletonSectionMagazine5 /> // Usar el nuevo componente SkeletonSectionMagazine5 durante la carga
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
