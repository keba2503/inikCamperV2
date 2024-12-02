'use client';

import Heading from "@/shared/Heading";
import React, { useState, useEffect, useContext } from "react";
import quotationImg from "@/images/quotation.png";
import quotationImg2 from "@/images/quotation2.png";
import clientSay1 from "@/images/clientSay1.png";
import clientSay2 from "@/images/clientSay2.png";
import clientSay3 from "@/images/clientSay3.png";
import clientSay4 from "@/images/clientSay4.png";
import clientSay5 from "@/images/clientSay5.png";
import clientSay6 from "@/images/clientSay6.png";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import { StarIcon } from "@heroicons/react/24/solid";
import { LanguageContext } from "@/context/LanguageContext";
import { translateText } from "@/utils/translate";

const ITEMS_PER_PAGE = 10;

const SkeletonLoader = () => (
    <div className="nc-SectionClientSay relative">
        <Heading desc={<div className="flex justify-center"><div className="h-5 w-5 bg-gray-300 rounded-full"></div></div>} isCenter>
            <div className="h-6 w-48 bg-gray-300 rounded"></div>
        </Heading>
    </div>
);

const SectionClientSay = ({ className = "" }) => {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [staticTexts, setStaticTexts] = useState({
        clientAvatar: "Client Avatar",
        product: "Product",
    });

    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("LanguageContext must be used within a LanguageProvider");
    }

    const { language } = context;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewResponse = await fetch('/api/review');
                const imageResponse = await fetch('/api/cloudinaryReview');

                if (reviewResponse.ok && imageResponse.ok) {
                    const reviews = await reviewResponse.json();
                    const images = await imageResponse.json();

                    const formattedData = await Promise.all(
                        reviews.map(async (review) => {
                            const image = images.find(img => img.id === review.avatarUrl);

                            // Traducción dinámica de comentarios
                            const translatedComment = await translateText(review.comment, language);

                            return {
                                ...review,
                                avatarUrl: image ? image.url : '',
                                comment: translatedComment,
                            };
                        })
                    );

                    setData(formattedData);
                } else {
                    console.error('Error fetching reviews or images');
                }
            } catch (error) {
                console.error('Error fetching reviews or images:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language]);

    useEffect(() => {
        const translateStaticTexts = async () => {
            const translatedClientAvatar = await translateText("Client Avatar", language);
            const translatedProduct = await translateText("Product", language);

            setStaticTexts({
                clientAvatar: translatedClientAvatar,
                product: translatedProduct,
            });
        };

        translateStaticTexts();
    }, [language]);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (index < data.length - 1) {
                setDirection(1);
                setIndex(index + 1);
            }
        },
        onSwipedRight: () => {
            if (index > 0) {
                setDirection(-1);
                setIndex(index - 1);
            }
        },
        trackMouse: true,
    });

    const renderStars = (rating) => {
        return (
            <div className="flex justify-center">
                {[...Array(5)].map((_, i) => (
                    <StarIcon
                        key={i}
                        className={`h-5 w-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                ))}
            </div>
        );
    };

    const renderPaginationDots = () => {
        const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
        const start = pageIndex * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        const pageData = data.slice(start, end);

        return (
            <div className="mt-10 flex items-center justify-center space-x-2">
                {pageIndex > 0 && (
                    <button onClick={() => setPageIndex(pageIndex - 1)}>&lt;</button>
                )}
                {pageData.map((item, i) => (
                    <button
                        className={`w-8 h-8 rounded-full overflow-hidden border-2 ${start + i === index ? "border-black/70" : "border-transparent"}`}
                        onClick={() => setIndex(start + i)}
                        key={start + i}
                    >
                        <Image
                            src={item.avatarUrl || ''}
                            alt={staticTexts.clientAvatar}
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                        />
                    </button>
                ))}
                {pageIndex < totalPages - 1 && (
                    <button onClick={() => setPageIndex(pageIndex + 1)}>&gt;</button>
                )}
            </div>
        );
    };

    return loading ? <SkeletonLoader /> : (
        <div className={`nc-SectionClientSay relative ${className}`}>
            <Heading desc={renderStars(data[index]?.rating)} isCenter>
                {data[index]?.username}
            </Heading>
            <div className="relative md:mb-16 max-w-2xl mx-auto">
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                        <Image
                            className="object-cover w-full h-full"
                            src={data[index]?.avatarUrl || ''}
                            alt={staticTexts.clientAvatar}
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div className={`mt-12 lg:mt-16 relative`}>
                    <Image
                        className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1"
                        src={quotationImg}
                        alt="quotation"
                    />
                    <Image
                        className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1"
                        src={quotationImg2}
                        alt="quotation"
                    />

                    <MotionConfig
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                        }}
                    >
                        <div className="relative w-full overflow-hidden" {...handlers}>
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.div
                                    key={index}
                                    custom={direction}
                                    variants={variants(200, 1)}
                                    initial="enter"
                                    animate="center"
                                    className="flex flex-col items-center text-center w-full"
                                >
                                    <>
                                        <span className="block text-center w-full">
                                            <div dangerouslySetInnerHTML={{ __html: data[index]?.comment }} />
                                        </span>
                                        <div className="flex items-center space-x-2 text-lg mt-2 text-neutral-400 pt-10">
                                            <CalendarIcon className="h-5 w-5" />
                                            <span>{`${staticTexts.product}: ${data[index]?.product}`}</span>
                                        </div>
                                    </>
                                </motion.div>
                            </AnimatePresence>

                            {renderPaginationDots()}
                        </div>
                    </MotionConfig>
                </div>
            </div>
        </div>
    );
};

export default SectionClientSay;
