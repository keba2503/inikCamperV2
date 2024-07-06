import Image from 'next/image';

const InfoSection = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        ¡Descuento del 5% para Canarios!
                    </h2>
                    <p className="mb-4 mt-10 text-justify">
                        En InikCamper, nos complace ofrecer un 5% de descuento en todas las reservas para los residentes de las Islas Canarias. Este es nuestro agradecimiento especial por su continuo apoyo y confianza en nuestros servicios.
                    </p>
                    <p className="mb-4 text-justify">
                        Ya sea que estés planeando una escapada de fin de semana o unas vacaciones largas, aprovecha esta oferta exclusiva para explorar el mundo con InikCamper. Nuestro compromiso es brindarte la mejor experiencia de viaje con la comodidad y flexibilidad que mereces.
                    </p>
                    <p className="mb-4 text-justify">
                        No dejes pasar esta oportunidad. Reserva ahora y disfruta de un descuento del 5% en todas tus reservas. ¡Te esperamos en InikCamper!
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-8">
                    <div className="relative w-full h-64">
                        <Image
                            className="w-full rounded-lg"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                            alt="office content 1"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="relative w-full h-64 mt-4 lg:mt-10">
                        <Image
                            className="w-full rounded-lg"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                            alt="office content 2"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InfoSection;
