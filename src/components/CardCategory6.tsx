import React, { FC, useState } from "react";
import { TaxonomyType } from "@/data/types";
import Link from "next/link";
import Image from "next/image";

export interface CardCategory6Props {
    className?: string;
    taxonomy: TaxonomyType;
    additionalText?: string;
}

const CardCategory6: FC<CardCategory6Props> = ({
                                                   className = "flex-1",
                                                   taxonomy,
                                                   additionalText = ""
                                               }) => {
    const [showOverlay, setShowOverlay] = useState(false);
    const { count, name, href = "/", thumbnail } = taxonomy;

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowOverlay(true);
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    };

    return (
        <div className={`nc-CardCategory6 relative flex w-full group rounded-2xl z-0 overflow-hidden ${className}`}>
            <Link href={href} onClick={handleClick} className="flex-1">
                <div className="aspect-w-16 aspect-h-10 sm:aspect-h-12 xl:aspect-h-9 w-full h-0"></div>
                <Image
                    fill
                    alt=""
                    src={thumbnail || ""}
                    className="object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 text-white">
                    <span className="absolute inset-0 bg-gradient-to-t from-black/60"></span>
                    <h2 className={`relative text-lg lg:text-xl font-semibold`}>{name}</h2>
                    <span className={`relative block mt-1.5 text-sm text-neutral-100`}>
          </span>
                </div>
            </Link>
            {showOverlay && (
                <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center text-white p-4">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <p>{additionalText}</p>
                        <button onClick={handleCloseOverlay} className="absolute top-2 right-2 bg-white text-black rounded-full p-1">
                            &times;
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CardCategory6;
