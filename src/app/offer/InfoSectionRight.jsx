import Image from 'next/image';

const InfoSectionRight = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
                <div className="order-2 lg:order-1 grid grid-cols-2 gap-4 mt-8 lg:mt-0">
                    <div className="relative w-full h-64 mb-6 lg:mb-0">
                        <Image
                            className="w-full rounded-lg"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                            alt="office content 1"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="relative w-full h-64 mt-4 lg:mt-10 mb-6 lg:mb-0">
                        <Image
                            className="w-full rounded-lg"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
                            alt="office content 2"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className="order-1 lg:order-2 font-light text-gray-500 sm:text-lg dark:text-gray-400 mt-6 lg:mt-0">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        ¡Descuento del 5% para Canarios!
                    </h2>
                    <p className="mt-10 mb-4 text-justify">
                        En InikCamper, nos enorgullece ofrecer a todos los residentes de las Islas Canarias un exclusivo 5% de descuento en todas nuestras reservas. Queremos reconocer y agradecer su continuo apoyo y preferencia por nuestros servicios.
                    </p>
                    <p className="mb-4 text-justify">
                        Nuestro objetivo es proporcionar la mejor experiencia de viaje posible, asegurándonos de que cada aventura sea cómoda y memorable. Con nuestra flota de campers bien equipadas y nuestro equipo dedicado, estamos aquí para hacer realidad sus sueños de viaje.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default InfoSectionRight;
