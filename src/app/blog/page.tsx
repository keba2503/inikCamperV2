import React from 'react';
import SectionMagazine5 from './SectionMagazine5';
import BgGlassmorphism from '@/components/BgGlassmorphism';

const BlogPage: React.FC = () => {
    return (
        <div className="nc-BlogPage overflow-hidden relative">
            <BgGlassmorphism />
            <div className="container relative">
                <div className="pt-12 pb-16 lg:pb-28">
                    <SectionMagazine5 />
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
