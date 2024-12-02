'use client';

import React, {useEffect, useState, useContext} from "react";
import Image from "next/image";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ModalWithTabs from "@/app/(client-components)/(Hero)/ModalWithTabs";
import axios from 'axios';
import parse from 'html-react-parser';
import SkeletonSectionHero3 from '@/components/SkeletonSectionHero3';
import {LanguageContext} from "@/context/LanguageContext";
import {translateText} from "@/utils/translate";

const SectionHero3 = ({className = ''}) => {
    const [showModal, setShowModal] = useState(false);
    const [heroes, setHeroes] = useState([]);
    const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
    const [touchStartX, setTouchStartX] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [buttonText, setButtonText] = useState("Disponibilidad");

    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("LanguageContext must be used within a LanguageProvider");
    }

    const {language} = context;

    useEffect(() => {
        const translateButtonText = async () => {
            const translatedText = await translateText("Disponibilidad", language);
            setButtonText(translatedText);
        };

        translateButtonText();
    }, [language]);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await axios.get('/api/hero');
                const heroData = response.data;

                // Translate hero content based on the current language
                const translatedHeroes = await Promise.all(
                    heroData.map(async (hero) => {
                        const translatedTitle = await translateText(hero.title, language);
                        const translatedSubtitle = await translateText(hero.subtitle, language);
                        const translatedDescription = await translateText(hero.description, language);

                        return {
                            ...hero,
                            title: translatedTitle,
                            subtitle: translatedSubtitle,
                            description: translatedDescription,
                        };
                    })
                );

                setHeroes(translatedHeroes);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching heroes:", error);
                setIsLoading(false);
            }
        };

        fetchHeroes();
    }, [language]);

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

    const currentHero = heroes[currentHeroIndex];

    if (isLoading) {
        return <SkeletonSectionHero3/>;
    }

    return (
        <div className={`nc-SectionHero3 relative ${className}`} data-nc-id="SectionHero3">
            {currentHero && (
                <>
                    {/* Text Content */}
                    <div
                        className="absolute z-20 inset-x-0 top-[10%] sm:top-[15%] flex flex-col items-start p-5 sm:p-10 text-left">
                        <span className="sm:text-lg md:text-3xl text-black">
                            {currentHero.title && typeof currentHero.title === 'string' && parse(currentHero.title)}
                        </span>
                        <div className="mt-4 sm:mt-6"/>
                        <h2 className="font-bold text-black text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl !leading-[120%] max-w-5xl">
                            {currentHero.subtitle && typeof currentHero.subtitle === 'string' && parse(currentHero.subtitle)}
                        </h2>
                        <div className="mt-4 sm:mt-10"/>
                        <p className="sm:text-lg md:text-2xl text-black max-w-4xl text-justify">
                            {currentHero.description && typeof currentHero.description === 'string' && parse(currentHero.description)}
                        </p>
                    </div>
                    {/* Image Content */}
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
                                    className="absolute inset-0 object-cover"
                                    src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${hero.imageUrl}.webp`}
                                    alt="hero"
                                    layout="fill"
                                    priority
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
            <div className={`absolute bottom-10 w-full flex justify-center z-20 ${className}`}>
                <ButtonPrimary
                    fontSize="text-sm sm:text-base lg:text-lg font-medium"
                    onClick={() => setShowModal(true)}
                >
                    {buttonText}
                </ButtonPrimary>
            </div>
            {showModal && <ModalWithTabs onClose={() => setShowModal(false)}/>}
        </div>
    );
};

export default SectionHero3;
