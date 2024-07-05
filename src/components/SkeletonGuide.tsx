import React from 'react';

const SkeletonGuide: React.FC = () => {
    return (
        <header className="container rounded-3xl px-4 lg:px-8 animate-pulse">
            <div className="max-w-screen-lg mx-auto space-y-5">
                <div className="h-10 bg-gray-300 rounded mb-4 w-2/3"></div>
                <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-full"></div>
                <div className="h-6 bg-gray-300 rounded w-full mt-2"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mt-2"></div>
            </div>
        </header>
    );
};

export default SkeletonGuide;
