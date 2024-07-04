import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';
import { Blog } from '@/data/types';
import PostCardMeta from '@/components/PostCardMeta';

export interface Card12Props {
    className?: string;
    post: Blog & { featuredImage: string };
}

const Card12: FC<Card12Props> = ({ className = 'h-full', post }) => {
    const { title, featuredImage, description, createdAt } = post;

    return (
        <div className={`nc-Card12 group relative flex flex-col ${className}`}>
            <Link
                href={`/blog/${post.id}`}
                className="block flex-shrink-0 flex-grow relative w-full h-0 aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden"
            >
                <Image
                    fill
                    src={featuredImage}
                    alt={title}
                    sizes="(max-width: 768px) 100vw, 400px"
                />
            </Link>

            <div className="mt-8 pr-10 flex flex-col">
                <h2 className="nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl">
                    <Link href={`/blog/${post.id}`} className="line-clamp-2" title={title}>
                        {title}
                    </Link>
                </h2>
                <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2">{parse(description)}</span>
        </span>
                <PostCardMeta className="mt-5" meta={{ createdAt }} />
            </div>
        </div>
    );
};

export default Card12;
