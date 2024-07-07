'use client';

import OfferForm from '../../(client-components)/(Admin)/Offer/OfferForm';
import OfferTable from '../../(client-components)/(Admin)/Offer/OfferTable';

const GuidePage = () => {
    return (
        <main className="flex flex-col items-center p-2 md:p-4 lg:p-6 min-h-screen">
            <div className="w-full max-w-7xl">
                <h1 className={`mb-4 text-2xl md:text-3xl text-center`}>
                    Ofertas
                </h1>
                <OfferForm/>
                <div className="mt-4">
                    <OfferTable/>
                </div>
            </div>
        </main>
    );
};

export default GuidePage;
