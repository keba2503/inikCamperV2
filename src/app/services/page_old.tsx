import React from "react";
import {TaxonomyType} from "@/data/types";
import CardCategory6 from "@/components/CardCategory6";
import Booking from "@/app/bookinHead/page";
import Heading from "@/shared/Heading";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";


const DEMO_CATS_2: TaxonomyType[] = [
    {
        id: "1",
        href: "/services",
        name: "Picnis",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://images.pexels.com/photos/2852438/pexels-photo-2852438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: "222",
        href: "/services",
        name: "Tablas de paddle surf",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://images.pexels.com/photos/2885904/pexels-photo-2885904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: "3",
        href: "/services",
        name: "Kayaks",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://images.pexels.com/photos/2404667/pexels-photo-2404667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: "4",
        href: "/services",
        name: "Kayaks",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://images.pexels.com/photos/2404667/pexels-photo-2404667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
        id: "5",
        href: "/services",
        name: "Alquiler de bicicletas",
        taxonomy: "category",
        count: 188288,
        thumbnail:
            "https://images.pexels.com/photos/1619299/pexels-photo-1619299.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
];

function Services() {
    return (
        <main className="nc-PageHome3 relative overflow-hidden">
            <div className="container relative space-y-24 mb-24 pt-12">
                <Heading
                    desc="Explora nuestros servicios y descubre cómo hacer tu viaje inolvidable"
                >
                    Nuestros servicios
                </Heading>
                {/* SECTION 1 */}
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
                        <CardCategory6 taxonomy={DEMO_CATS_2[0]}/>
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4 grid grid-rows-2 gap-6">
                        <CardCategory6 taxonomy={DEMO_CATS_2[3]}/>
                        <CardCategory6 taxonomy={DEMO_CATS_2[1]}/>
                    </div>
                    <div className="col-span-12 sm:col-span-6 lg:col-span-4 flex">
                        <CardCategory6 taxonomy={DEMO_CATS_2[4]}/>
                    </div>
                </div>
            </div>

            <div className="container px-1 sm:px-4 mb-24 ">
                <h3 className="text-center text-2xl font-bold mb-4">Reserva aquí</h3>
                <Booking/>
                <SectionGridFeaturePlaces cardType="card2"/>
            </div>
        </main>
    );
}

export default Services;
