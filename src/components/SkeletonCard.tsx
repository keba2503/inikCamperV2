import React from 'react';

const SkeletonCard: React.FC<{ variant: 'large' | 'small' }> = ({ variant }) => {
    return (
        <div className={`relative flex flex-col bg-gray-200 rounded-lg animate-pulse ${variant === 'large' ? 'h-64' : 'h-40'} w-full`}>
            <div className="absolute top-0 left-0 right-0 bg-gray-300 h-2/3 rounded-t-lg"></div>
            <div className="p-4 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-2">
                    <div className="bg-gray-300 h-6 w-3/4 rounded"></div>
                    <div className="bg-gray-300 h-4 w-1/2 rounded"></div>
                </div>
                <div className="bg-gray-300 h-4 w-1/3 rounded"></div>
            </div>
        </div>
    );
};

export default SkeletonCard;
