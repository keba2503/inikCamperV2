import Image from 'next/image';
import InfoSection from './InfoSection';
import InfoSectionRight from './InfoSectionRight';
import OfferGallery from './OfferGallery';
import ModalButton from './ModalButton';

const HeroSection = () => {
    return (
        <div>
            <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
                <div className="fixed top-0 left-0 w-full h-[20rem] sm:h-[24rem] md:h-[28rem] lg:h-[32rem] xl:h-[30rem] z-10">
                    <Image
                        src="https://images.pexels.com/photos/127673/pexels-photo-127673.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                        className=""
                        alt="Background image"
                    />
                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                                ¡Descuento del 5% para Canarios!
                            </h1>
                            <p className="mb-8 text-lg font-normal text-gray-200 lg:text-xl sm:px-16 xl:px-48">
                                Aquí en InikCamper ofrecemos un 5% de descuento en todas las reservas para residentes de las Islas Canarias. Aprovecha esta oferta exclusiva y disfruta de nuestras increíbles promociones.
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-[-2rem] left-1/2 transform -translate-x-1/2 z-20">
                        <ModalButton />
                    </div>
                </div>
            </div>
            <div className="container px-1 sm:px-4 mb-24 mt-[25rem] sm:mt-[30rem] md:mt-[30rem] lg:mt-[30rem] xl:mt-[30rem] relative z-0">
                <InfoSection/>
                <InfoSectionRight/>
                <OfferGallery/>
            </div>
        </div>
    );
};

export default HeroSection;
