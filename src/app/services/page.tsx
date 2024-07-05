'use client';

import React from 'react';
import Services from './Services';
import Booking from '@/app/bookinHead/page';
import SectionGridFeaturePlaces from '@/components/SectionGridFeaturePlaces';

const Page: React.FC = () => {
    return (
        <main className="nc-PageHome3 relative overflow-hidden">
            <Services />
            <div className="container px-1 sm:px-4 mb-24">
                <h3 className="text-center text-2xl font-bold mb-4">Reserva aquí</h3>
                <Booking />
                <SectionGridFeaturePlaces cardType="card2" />
            </div>
        </main>
    );
};

export default Page;
