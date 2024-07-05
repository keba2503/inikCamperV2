import React from 'react';

const SkeletonSectionHero3: React.FC = () => {
    return (
        <div className="nc-SectionHero3 relative animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-300 to-gray-500 z-10"></div> {/* Overlay */}
            <div className="absolute z-20 inset-x-0 top-[10%] sm:top-[15%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
                <span className="sm:text-lg md:text-xl font-semibold bg-gray-400 w-3/4 h-6 rounded"></span>
                <h2 className="font-bold bg-gray-400 w-full h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 rounded"></h2>
            </div>
            <div className="relative w-full aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8">
                <div className="absolute inset-0 bg-gray-300 rounded-xl"></div>
            </div>
            <div className="absolute bottom-10 w-full flex justify-center z-20">
                <div className="bg-gray-400 w-32 h-10 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonSectionHero3;
