"use client";

import Heading from "@/shared/Heading";
import React, { useState, useEffect } from "react";
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

const ITEMS_PER_PAGE = 10;

const SectionClientSay = ({ className = "" }) => {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reviewResponse = await fetch('/api/review');
                const imageResponse = await fetch('/api/cloudinaryReview');

                if (reviewResponse.ok && imageResponse.ok) {
                    const reviews = await reviewResponse.json();
                    const images = await imageResponse.json();

                    const formattedData = reviews.map(review => {
                        const image = images.find(img => img.id === review.avatarUrl);
                        return {
                            ...review,
                            avatarUrl: image ? image.url : '',
                        };
                    });

                    setData(formattedData);
                } else {
                    console.error('Error fetching reviews or images');
                }
            } catch (error) {
                console.error('Error fetching reviews o imágenes:', error);
            }
        };

        fetchData();
    }, []);

    function changeItemId(newVal) {
        if (newVal > index) {
            setDirection(1);
        } else {
            setDirection(-1);
        }
        setIndex(newVal);
    }

    function changePage(newPageIndex) {
        if (newPageIndex >= 0 && newPageIndex < Math.ceil(data.length / ITEMS_PER_PAGE)) {
            setPageIndex(newPageIndex);
        }
    }

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (index < data?.length - 1) {
                changeItemId(index + 1);
            }
        },
        onSwipedRight: () => {
            if (index > 0) {
                changeItemId(index - 1);
            }
        },
        trackMouse: true,
    });

    let currentItem = data[index];

    const renderBg = () => {
        return (
            <div className="hidden md:block">
                <Image
                    className="absolute top-9 -left-20"
                    src={clientSay1}
                    alt="client 1"
                />
                <Image
                    className="absolute bottom-[100px] right-full mr-40"
                    src={clientSay2}
                    alt="client 2"
                />
                <Image
                    className="absolute -bottom-20 left-[140px]"
                    src={clientSay3}
                    alt="client 3"
                />
                <Image
                    className="absolute -bottom-20 right-[140px]"
                    src={clientSay4}
                    alt="client 4"
                />
                <Image
                    className="absolute left-full ml-32 bottom-[80px]"
                    src={clientSay5}
                    alt="client 5"
                />
                <Image
                    className="absolute -right-10 top-10"
                    src={clientSay6}
                    alt="client 6"
                />
            </div>
        );
    };

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
                    <button onClick={() => changePage(pageIndex - 1)}>&lt;</button>
                )}
                {pageData.map((item, i) => (
                    <button
                        className={`w-8 h-8 rounded-full overflow-hidden border-2 ${start + i === index ? "border-black/70" : "border-transparent"}`}
                        onClick={() => changeItemId(start + i)}
                        key={start + i}
                    >
                        <Image
                            src={item.avatarUrl || ''}
                            alt="Client Avatar"
                            width={32}
                            height={32}
                            className="object-cover w-full h-full"
                        />
                    </button>
                ))}
                {pageIndex < totalPages - 1 && (
                    <button onClick={() => changePage(pageIndex + 1)}>&gt;</button>
                )}
            </div>
        );
    };

    return (
        <div className={`nc-SectionClientSay relative ${className}`}>
            <Heading desc={renderStars(currentItem?.rating)} isCenter>
                {currentItem?.username}
            </Heading>
            <div className="relative md:mb-16 max-w-2xl mx-auto">
                {renderBg()}
                <div className="flex justify-center mb-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                        <Image
                            className="object-cover w-full h-full"
                            src={currentItem?.avatarUrl || ''}
                            alt="Client Avatar"
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
                      <div dangerouslySetInnerHTML={{ __html: currentItem?.comment }} />
                    </span>
                                        <div className="flex items-center space-x-2 text-lg mt-2 text-neutral-400 pt-10">
                                            <CalendarIcon className="h-5 w-5" />
                                            <span>{currentItem?.product}</span>
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
