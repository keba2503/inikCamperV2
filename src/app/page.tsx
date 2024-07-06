import React from "react";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionHero3 from "@/app/(server-components)/SectionHero3";
import Booking from "@/app/bookinHead/page";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionVideos from "@/components/SectionVideos";
import PageContact from "@/app/contact/page";
import Services from "@/app/services/Services";


function PageHome3() {
    return (
        <main className="nc-PageHome3 relative overflow-hidden">
            {/* GLASSMOPHIN */}
            <BgGlassmorphism/>
            {/* SECTION HERO */}
            <div className="container px-1 sm:px-4 mb-24 ">
                <SectionHero3 className=""/>
            </div>
            <div className="container px-1 sm:px-4 mb-24 ">
                <h3 className="text-center text-2xl font-bold mb-4">Reserva aquí</h3>
                <Booking/>
                <SectionGridFeaturePlaces cardType="card2"/>
                <Services/>
                <SectionVideos/>
            </div>
            <PageContact/>
        </main>
    );
}

export default PageHome3;
