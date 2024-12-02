'use client';

import React, { useContext, useEffect, useState } from "react";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionHero3 from "@/app/(server-components)/SectionHero3";
import Booking from "@/app/bookinHead/page";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionVideos from "@/components/SectionVideos";
import PageContact from "@/app/contact/page";
import Services from "@/app/services/Services";
import SectionClientSay from "@/components/SectionClientSay";
import { LanguageContext } from "@/context/LanguageContext";
import { translateText } from "@/utils/translate";

function PageHome3() {
    const [reservationTitle, setReservationTitle] = useState("Reserva aquí");
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("LanguageContext must be used within a LanguageProvider");
    }

    const { language } = context;

    useEffect(() => {
        const translateStaticText = async () => {
            const translatedTitle = await translateText("Reserva aquí", language);
            setReservationTitle(translatedTitle);
        };

        translateStaticText();
    }, [language]);

    return (
        <main className="nc-PageHome3 relative overflow-hidden">
            {/* GLASSMOPHISM */}
            <BgGlassmorphism/>
            {/* SECTION HERO */}
            <div className="container px-1 sm:px-4 mb-24 ">
                <SectionHero3 className=""/>
            </div>
            <div className="container px-1 sm:px-4 mb-24 ">
                <h3 className="text-center text-2xl font-bold mb-4">{reservationTitle}</h3>
                <Booking/>
                <SectionClientSay/>
                <SectionGridFeaturePlaces cardType="card2"/>
                <Services/>
                <SectionVideos/>
            </div>
            <PageContact/>
        </main>
    );
}

export default PageHome3;