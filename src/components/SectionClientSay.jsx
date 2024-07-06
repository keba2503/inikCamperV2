'use client';

import Heading from "@/shared/Heading";
import React, {useState, useEffect} from "react";
import quotationImg from "@/images/quotation.png";
import quotationImg2 from "@/images/quotation2.png";
import {CalendarIcon} from "@heroicons/react/24/outline";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import Image from "next/image";
import {useSwipeable} from "react-swipeable";
import {variants} from "@/utils/animationVariants";

const SectionClientSay = ({className = ""}) => {
    const [data, setData] = useState([]);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(0);

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

    return (
        <div className={`nc-SectionClientSay relative ${className}`}>
            <Heading desc="" isCenter>
                {currentItem?.username}
            </Heading>
            <div className="relative md:mb-16 max-w-2xl mx-auto">
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
                <div className="mt-12 lg:mt-16 relative">
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
                            x: {type: "spring", stiffness: 300, damping: 30},
                            opacity: {duration: 0.2},
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
          <div dangerouslySetInnerHTML={{__html: currentItem?.comment}}/>
        </span>
                                        <div className="flex items-center space-x-2 text-lg mt-2 text-neutral-400 pt-10">
                                            <CalendarIcon className="h-5 w-5"/>
                                            <span>{currentItem?.product}</span>
                                        </div>
                                    </>
                                </motion.div>
                            </AnimatePresence>

                            <div className="mt-10 flex items-center justify-center space-x-2">
                                {data.map((item, i) => (
                                    <button
                                        className={`w-2 h-2 rounded-full ${i === index ? "bg-black/70" : "bg-black/10"}`}
                                        onClick={() => changeItemId(i)}
                                        key={i}
                                    />
                                ))}
                            </div>
                        </div>
                    </MotionConfig>
                </div>
            </div>
        </div>
    );
};

export default SectionClientSay;
