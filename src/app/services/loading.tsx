import React from 'react';
import SkeletonCardCategory6 from '@/components/SkeletonCardCategory6';

const Loading: React.FC = () => {
  return (
      <div className="container relative space-y-24 mb-24 pt-12">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-400 rounded mb-4 w-1/3"></div>
          <div className="h-6 bg-gray-400 rounded w-2/3"></div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <SkeletonCardCategory6 />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
            <SkeletonCardCategory6 />
            <SkeletonCardCategory6 />
          </div>
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
            <SkeletonCardCategory6 />
          </div>
        </div>
      </div>
  );
};

export default Loading;
