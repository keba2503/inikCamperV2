import React from 'react';
import SkeletonCard from './SkeletonCard';

const SkeletonSectionMagazine5: React.FC = () => {
    return (
        <div className="nc-SectionMagazine5">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
                <SkeletonCard variant="large" />
                <div className="grid gap-6 md:gap-8">
                    <SkeletonCard variant="small" />
                    <SkeletonCard variant="small" />
                    <SkeletonCard variant="small" />
                </div>
            </div>
        </div>
    );
};

export default SkeletonSectionMagazine5;