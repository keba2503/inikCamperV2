'use client';

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BlogDetailSkeleton = () => {
    return (
        <div className="nc-PageSingle pt-8 lg:pt-16">
            <header className="container rounded-xl">
                <div className="max-w-screen-lg mx-auto space-y-5">
                    <Skeleton width={100} height={30} />
                    <Skeleton width={`80%`} height={40} />
                    <Skeleton width={`60%`} height={20} />
                    <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
                    <div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
                        <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
                            <Skeleton circle={true} height={50} width={50} />
                            <div className="ml-3">
                                <Skeleton width={100} height={20} />
                                <Skeleton width={150} height={15} />
                            </div>
                        </div>
                        <div className="mt-3 sm:mt-0 sm:ml-3 flex items-center space-x-3 relative">
                            <Skeleton width={100} height={40} />
                        </div>
                    </div>
                </div>
            </header>
            <div className="container my-10 sm:my-12">
                <Skeleton height={400} />
            </div>
            <div className="nc-SingleContent container space-y-6">
                <div id="single-entry-content" className="prose dark:prose-invert prose-sm !max-w-screen-lg sm:prose lg:prose-lg mx-auto dark:prose-dark text-justify">
                    <Skeleton count={10} />
                </div>
                <div className="max-w-screen-lg mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
                <div className="max-w-screen-lg mx-auto">
                    <div className="nc-SingleAuthor flex">
                        <Skeleton circle={true} height={50} width={50} />
                        <div className="flex flex-col ml-3 max-w-lg sm:ml-5 space-y-1">
                            <Skeleton width={100} height={20} />
                            <Skeleton width={200} height={25} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetailSkeleton;
