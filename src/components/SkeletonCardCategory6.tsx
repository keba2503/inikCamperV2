import React from 'react';

const SkeletonCardCategory6: React.FC = () => {
    return (
        <div className="relative flex w-full group rounded-2xl z-0 overflow-hidden bg-gray-300 animate-pulse">
            <div className="aspect-w-16 aspect-h-10 sm:aspect-h-12 xl:aspect-h-9 w-full h-0"></div>
            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
                <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
                <div className="relative w-1/2 h-6 bg-gray-400 rounded"></div>
                <div className="relative w-1/3 h-4 bg-gray-400 rounded mt-2"></div>
            </div>
        </div>
    );
};

export default SkeletonCardCategory6;
