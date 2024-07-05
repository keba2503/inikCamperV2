'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import parse, { domToReact } from 'html-react-parser';
import { ShareIcon } from '@heroicons/react/24/solid';
import Avatar from '@/shared/Avatar';
import Badge from '@/shared/Badge';
import SocialsList from '@/shared/SocialsList';
import ButtonPrimary from "../../../shared/ButtonPrimary";
import BlogDetailSkeleton from '../../../components/BlogDetailSkeleton'; 

const BlogDetailPage = () => {
    const params = useParams();
    const id = params?.slug ? params.slug[0] : null;

    const [blog, setBlog] = useState(null);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [bodyImage, setBodyImage] = useState(null);
    const [showShareOptions, setShowShareOptions] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    const response = await axios.get(`/api/blog/${id}`);
                    setBlog(response.data);

                    // Fetch images from Cloudinary
                    const imagesResponse = await axios.get('/api/cloudinaryBlog');
                    const images = imagesResponse.data;

                    const coverImage = images.find((img) => img.id === response.data.coverImageUrl);
                    const bodyImage = images.find((img) => img.id === response.data.bodyImageUrl);

                    if (coverImage) setFeaturedImage(coverImage.url);
                    if (bodyImage) setBodyImage(bodyImage.url);
                } catch (error) {
                    console.error('Error fetching blog:', error);
                }
            };

            fetchBlog();
        }
    }, [id]);

    if (!blog) return <BlogDetailSkeleton />;

    const splitArticle = (article) => {
        const paragraphs = article.split('</p>');
        const middleIndex = Math.floor(paragraphs.length / 2);
        return {
            firstHalf: paragraphs.slice(0, middleIndex).join('</p>'),
            secondHalf: paragraphs.slice(middleIndex).join('</p>'),
        };
    };

    const { firstHalf, secondHalf } = splitArticle(blog.article);

    const parsedFirstHalf = parse(firstHalf, {
        replace: (domNode) => {
            if (domNode.name === 'p') {
                return <span className="block mb-2">{domToReact(domNode.children)}</span>;
            }
        },
    });

    const parsedSecondHalf = parse(secondHalf, {
        replace: (domNode) => {
            if (domNode.name === 'p') {
                return <span className="block mb-2">{domToReact(domNode.children)}</span>;
            }
        },
    });

    const handleShareClick = () => {
        setShowShareOptions(!showShareOptions);
    };

    const handleShareOptionClick = (url) => {
        window.open(url, '_blank');
        setShowShareOptions(false);
    };

    return (
        <div className="nc-PageSingle pt-8 lg:pt-16">
            <header className="container rounded-xl">
                <div className="max-w-screen-lg mx-auto space-y-5">
                    <Badge href="/blog" color="purple" name="Traveler" />
                    <h1 className="text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl">
                        {blog.title}
                    </h1>
                    <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1 text-justify">
                        {parse(blog.description)}
                    </span>
                    <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
                    <div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
                        <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
                            <Avatar containerClassName="flex-shrink-0" sizeClass="w-8 h-8 sm:h-11 sm:w-11" />
                            <div className="ml-3">
                                <div className="flex items-center">
                                    <span className="block font-semibold">Isabel Soler</span>
                                </div>
                                <div className="text-xs mt-[6px]">
                                    <span className="text-neutral-700 dark:text-neutral-300">
                                        {new Date(blog.createdAt).toLocaleDateString()}
                                    </span>
                                    <span className="mx-2 font-semibold">·</span>
                                    <span className="text-neutral-700 dark:text-neutral-300">6 min read</span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3 flex items-center space-x-3 relative">
                            <SocialsList />
                            <div className="pl-10">
                                <ButtonPrimary
                                    onClick={handleShareClick}
                                >
                                    <ShareIcon className="w-6 h-6 mr-2" />
                                    ¡Comparte!
                                </ButtonPrimary>
                            </div>

                            {showShareOptions && (
                                <div className="absolute right-0 top-12 bg-white dark:bg-neutral-800 shadow-lg rounded-lg p-4 z-10">
                                    <p className="text-sm">Compartir en:</p>
                                    <ul className="mt-2 space-y-2">
                                        <li>
                                            <a
                                                href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => handleShareOptionClick(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}
                                                className="block text-blue-600"
                                            >
                                                Facebook
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => handleShareOptionClick(`https://twitter.com/intent/tweet?url=${window.location.href}`)}
                                                className="block text-blue-400"
                                            >
                                                Twitter
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => handleShareOptionClick(`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}`)}
                                                className="block text-blue-700"
                                            >
                                                LinkedIn
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`https://api.whatsapp.com/send?text=${window.location.href}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={() => handleShareOptionClick(`https://api.whatsapp.com/send?text=${window.location.href}`)}
                                                className="block text-green-600"
                                            >
                                                WhatsApp
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
            <div className="container my-10 sm:my-12">
                {featuredImage && (
                    <Image className="w-full rounded-xl" src={featuredImage} alt={blog.title} layout="responsive" width={700} height={475} />
                )}
            </div>
            <div className="nc-SingleContent container space-y-6">
                <div id="single-entry-content" className="prose dark:prose-invert prose-sm !max-w-screen-lg sm:prose lg:prose-lg mx-auto dark:prose-dark text-justify">
                    {parsedFirstHalf}
                    {bodyImage && (
                        <figure>
                            <Image src={bodyImage} alt="body image" className="rounded-2xl" layout="responsive" width={700} height={475} />
                        </figure>
                    )}
                    {parsedSecondHalf}
                </div>
                <div className="max-w-screen-lg mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
                <div className="max-w-screen-lg mx-auto">
                    <div className="nc-SingleAuthor flex">
                        <Avatar sizeClass="w-11 h-11 md:w-24 md:h-24" />
                        <div className="flex flex-col ml-3 max-w-lg sm:ml-5 space-y-1">
                            <span className="text-xs text-neutral-400 uppercase tracking-wider">WRITTEN BY</span>
                            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 pb-20">
                                Isabel Soler
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailPage;
