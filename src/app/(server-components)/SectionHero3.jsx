'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ModalWithTabs from "@/app/(client-components)/(Hero)/ModalWithTabs";
import axios from 'axios';
import parse from 'html-react-parser';
import SkeletonSectionHero3 from '@/components/SkeletonSectionHero3';
import superhost from '@/images/superhost.png';

const SectionHero3 = ({ className = '' }) => {
    const [showModal, setShowModal] = useState(false);
    const [heroes, setHeroes] = useState([]);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await axios.get('/api/hero');
                setHeroes(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching heroes:', error);
                setIsLoading(false);
            }
        };
        fetchHeroes();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            nextHero();
        }, 5000);
        return () => clearInterval(interval);
    }, [currentHeroIndex, heroes.length]);

    const nextHero = () => {
        setCurrentHeroIndex((prevIndex) => (prevIndex + 1) % heroes.length);
    };

    const prevHero = () => {
        setCurrentHeroIndex((prevIndex) => (prevIndex - 1 + heroes.length) % heroes.length);
    };

    const currentHero = heroes[currentHeroIndex];

    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setTouchStartX(touch.clientX);
    };

    const handleTouchMove = (e) => {
        if (!touchStartX) return;
        const touch = e.touches[0];
        const touchEndX = touch.clientX;

        if (touchStartX - touchEndX > 50) {
            nextHero();
        }

        if (touchStartX - touchEndX < -50) {
            prevHero();
        }

        setTouchStartX(null);
    };

    const handleImageClick = () => {
        nextHero();
    };

    if (isLoading) {
        return <SkeletonSectionHero3 />;
    }

    return (
        <div className={`nc-SectionHero3 relative ${className}`} data-nc-id="SectionHero3">
            {currentHero && (
                <>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent z-10"></div> {/* Overlay */}
                    <div className="absolute z-20 inset-x-0 top-[10%] sm:top-[15%] text-center flex flex-col items-center max-w-2xl mx-auto space-y-4 lg:space-y-5 xl:space-y-8">
                        <span className="sm:text-lg md:text-xl font-semibold text-white"> {/* Adjusted text color */}
                            {parse(currentHero.title)}
                        </span>
                        <h2 className="font-bold text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl !leading-[115%]"> {/* Adjusted text color */}
                            {parse(currentHero.description)}
                        </h2>
                    </div>
                    <div className="absolute top-4 left-4 z-30">
                        <Image
                            src={superhost}
                            alt="Superhost Badge"
                            width={180}
                            height={150}
                        />
                    </div>
                    <div
                        className="relative w-full aspect-w-1 aspect-h-1 sm:aspect-w-4 sm:aspect-h-3 lg:aspect-w-16 lg:aspect-h-9 xl:aspect-h-8"
                        id="default-carousel"
                        data-carousel="slide"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onClick={handleImageClick}
                    >
                        {heroes.map((hero, index) => (
                            <div
                                key={index}
                                className={`${
                                    index === currentHeroIndex ? 'block' : 'hidden'
                                } duration-700 ease-in-out`}
                                data-carousel-item
                            >
                                <Image
                                    className="absolute inset-0 object-cover rounded-xl"
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${hero.imageUrl}.webp`}
                                    alt="hero"
                                    layout="fill"
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-10 w-full flex justify-center z-20"> {/* Added z-index */}
                        <ButtonPrimary
                            fontSize="text-sm sm:text-base lg:text-lg font-medium"
                            onClick={() => setShowModal(true)}
                        >
                            Disponibilidad
                        </ButtonPrimary>
                    </div>
                </>
            )}
            {showModal && <ModalWithTabs onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default SectionHero3;
