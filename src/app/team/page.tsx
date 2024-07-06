import Heading from "@/shared/Heading";
import Image, {StaticImageData} from "next/image";
import React from "react";
import img from "../../images/Exteriores/1.jpg";
import img1 from "../../images/Exteriores/2.jpg";
import img2 from "../../images/Exteriores/3.jpg";
import img3 from "../../images/Exteriores/4.jpg";
export interface People {
    id: string;
    name: string;
    job: string;
    avatar: StaticImageData;
}

const FOUNDER_DEMO: People[] = [
    {
        id: "1",
        name: `Isabel Soler`,
        job: "Co-founder",
        avatar: img3,
    },
    {
        id: "2",
        name: `Karen Borrero`,
        job: "Co-founder",
        avatar: img2,
    },
    {
        id: "3",
        name: `Iria`,
        job: "",
        avatar: img1,
    },
    {
        id: "4",
        name: `Nauzet`,
        job: "",
        avatar: img,
    },
];

const Page = () => {
    return (
        <div className="container py-8 lg:py-28 space-y-16 lg:space-y-28">
            <div className="nc-SectionFounder relative">
                <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                        Una familia
                    </h2>
                    <p className="mb-4 font-light text-justify">
                        Somos apasionados de la libertad, haciendo planes para vivencias, disfrutando la vida con lo que te da, sin muchos complementos, y pudiendo transmitir eso a nuestro entorno a través del medio que conocemos, tenemos experiencia y también disfrutamos de la &apos;Van Life&apos;.
                    </p>
                    <p className="mb-4 font-medium pb-10">
                        Somos una familia aventurera y emprendedora. Nuestras iniciales unidas forman el nombre de nuestro estupendo equipo &apos;INIK&apos;.
                    </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-4 xl:gap-x-8">
                    {FOUNDER_DEMO.map((item) => (
                        <div key={item.id} className="max-w-sm">
                            <div className="relative h-0 aspect-h-1 aspect-w-1 rounded-xl overflow-hidden">
                                <Image
                                    fill
                                    className=" object-cover"
                                    src={item.avatar}
                                    alt=""
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 30vw, 30vw"
                                />
                            </div>

                            <h3 className="text-lg font-semibold text-neutral-900 mt-4 md:text-xl dark:text-neutral-200">
                                {item.name}
                            </h3>
                            <span className="block text-sm text-neutral-500 sm:text-base dark:text-neutral-400">
              {item.job}
            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
