import React, { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser';
import { Blog } from '@/data/types';
import PostCardMeta from '@/components/PostCardMeta';

export interface Card13Props {
    className?: string;
    post: Blog & { featuredImage: string };
}

const Card13: FC<Card13Props> = ({ className = '', post }) => {
    const { title, featuredImage, description, createdAt } = post;

    return (
        <div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
            <div className="flex flex-col h-full py-2">
                <h2 className="nc-card-title block font-semibold text-base">
                    <Link href={`/blog/${post.id}`} className="line-clamp-2" title={title}>
                        {title}
                    </Link>
                </h2>
                <span className="hidden sm:block my-3 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2">{parse(description)}</span>
        </span>
                <span className="mt-4 block sm:hidden text-sm text-neutral-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
                <div className="mt-auto hidden sm:block">
                    <PostCardMeta meta={{ createdAt }} />
                </div>
            </div>

            <Link href={`/blog/${post.id}`} className="block relative h-full flex-shrink-0 w-2/5 sm:w-1/3 ml-3 sm:ml-5">
                <Image
                    fill
                    className="object-cover rounded-xl sm:rounded-3xl"
                    src={featuredImage}
                    alt={title}
                    sizes="(max-width: 768px) 100vw, 400px"
                />
            </Link>
        </div>
    );
};

export default Card13;
