"use client";

import React, {FC, Fragment, useEffect, useState, useRef} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {Squares2X2Icon} from "@heroicons/react/24/outline";
import Badge from "@/shared/Badge";
import ButtonSecondary from "@/shared/ButtonSecondary";
import ButtonClose from "@/shared/ButtonClose";
import Image from "next/image";
import {usePathname, useRouter} from "next/navigation";
import {Amenities_demos, PHOTOS} from "./constant";
import {Route} from "next";

declare global {
    interface Window {
        BookingToolIframe: any;
    }
}


export interface InikDarkDetailPageProps {
}

const InikDarkDetailPage: FC<InikDarkDetailPageProps> = ({}) => {
    //

    let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

    const thisPathname = usePathname();
    const router = useRouter();

    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const scriptLoadedRef = useRef(false);

    useEffect(() => {
        const scriptId = 'booking-tool-script';

        // Verificar si el script ya está presente
        if (!scriptLoadedRef.current && !document.getElementById(scriptId)) {
            const script = document.createElement('script');
            script.id = scriptId; // Asignar un id al script
            script.type = 'text/javascript';
            script.src = 'https://login.smoobu.com/js/Settings/BookingToolIframe.js';
            script.async = true;
            script.onload = () => {
                if (window.BookingToolIframe ) {
                    window.BookingToolIframe.initialize({
                        url: "https://login.smoobu.com/es/booking-tool/iframe/765914/2156066",
                        baseUrl: 'https://login.smoobu.com',
                        target: '#apartmentIframeAll'
                    });
                }
                setIsScriptLoaded(true);
                scriptLoadedRef.current = true;
            };
            document.body.appendChild(script);
        } else {
            setIsScriptLoaded(true);
        }

        return () => {
            const script = document.getElementById(scriptId);
            if (script && document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);
    function closeModalAmenities() {
        setIsOpenModalAmenities(false);
    }

    function openModalAmenities() {
        setIsOpenModalAmenities(true);
    }

    const handleOpenModalImageGallery = () => {
        router.push(`${thisPathname}/?modal=PHOTO_TOUR_SCROLLABLE` as Route);
    };

    const renderSection1 = () => {
        return (
            <div className="listingSection__wrap !space-y-6">
                {/* 1 */}
                <div className="flex justify-between items-center">
                    <Badge name="Gran Canaria"/>
                </div>

                {/* 2 */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
                    InikCar
                </h2>

                {/* 5 */}
                <div className="w-full border-b border-neutral-100 dark:border-neutral-700"/>

                {/* 6 */}
                <div
                    className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center space-x-3 ">
                        <i className=" las la-user text-2xl "></i>
                        <span className="">
              4 <span className="hidden sm:inline-block">huespedes</span>
            </span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <i className=" las la-bed text-2xl"></i>
                        <span className=" ">
              2 <span className="hidden sm:inline-block">camas</span>
            </span>
                    </div>
                </div>
            </div>
        );
    };

    const renderSection2 = () => {
        return (
            <div className="listingSection__wrap">
                <h2 className="text-2xl font-semibold">Información del Camper</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="text-neutral-6000 dark:text-neutral-300 text-justify">
                   <span className="block mb-4">
    ¿Buscas una experiencia de viaje única e inolvidable? ¡Bienvenido a Inikcamper! Nuestro mini camper está diseñado para aventureros como tú, dispuestos a explorar Gran Canaria de una manera completamente diferente. Con una cocina portátil para deleitar tu paladar con delicias locales, fregadero y ducha para refrescarte en cualquier momento, y todo lo necesario para cocinar para dos personas, tu comodidad está asegurada.
</span>

                    <span className="block mb-4">
    <strong>El espacio</strong><br/><br/>
    Nuestro refugio rodante ofrece comodidad y facilidad de conducción, siendo además muy acogedor. Hemos equipado el vehículo con todo lo necesario para que se sientan como en casa durante sus vacaciones, dentro de los límites del espacio disponible.
</span>

                    <span className="block mb-4">
    Destacamos nuestra preocupación por la sostenibilidad ambiental: contamos con un sistema de centro de energía que cargamos con placas solares antes de su aventura para reducir nuestra huella de carbono, ofrecemos un sistema de agua limitado pero suficiente para garantizar un uso responsable, los botes de jabón son rellenables y utilizamos productos biodegradables, incluyendo bolsas de basura.
</span>

                    <span className="block mb-4">
    Además, por cada huésped que nos visita, contribuimos a la compra de un árbol para compensar las emisiones de CO2 generadas durante los viajes.
</span>

                    <span className="block mb-4">
    <strong>Servicios y zonas comunes</strong><br/><br/>
    Tendrás a tu disposición un espacio completamente privado y personalizado para que disfrutes de una experiencia única. Dentro del refugio rodante, encontrarás todas las comodidades necesarias para que tu estancia sea cómoda y placentera. Dispondrás de unas sillas y mesita bajita para disfrutar de un área de descanso confortable, una cocina equipada para preparar tus propias comidas y limpiar tus enseres, una ducha solar para asearte y un espacio de descanso a tu disposición un espacio completamente privado en la tienda nómada para que disfrutes de unas noches únicas.
</span>

                    <span className="block mb-4">
    Nuestra prioridad es tu bienestar y seguridad, por eso nos aseguramos de que cada detalle esté cuidado. Desde el suministro de agua hasta la energía para cargar tus dispositivos, todo está pensado para ofrecerte una experiencia sin preocupaciones.
</span>

                    <span className="block mb-4">
    Disfruta de encontrar esos lugares escondidos de Gran Canaria sin tener que mirar atrás, tendrás todo lo necesario para disfrutar de tus vacaciones sin preocupaciones, tenemos autonomía para varios días con placas solares, enchufes para tus pequeños electrodomésticos 12v y enchufes de 220v para tu portátil.
</span>

                    <span className="block mb-4">
    Todo lo necesario para la cocina, asearte y pernoctar. Pasa unos días maravillosos y comienza tu aventura en Las Islas Canarias.
</span>

                </div>
            </div>
        );
    };

    const renderSection3 = () => {
        return (
            <div className="listingSection__wrap">
                <div>
                    <h2 className="text-2xl font-semibold">Comodidades
                    </h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` Acerca de los servicios y comodidades de la propiedad`}
          </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* 6 */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
                    {Amenities_demos.filter((_, i) => i < 12).map((item) => (
                        <div key={item.name} className="flex items-center space-x-3">
                            <i className={`text-3xl las ${item.icon}`}></i>
                            <span className=" ">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* ----- */}
                <div className="w-14 border-b border-neutral-200"></div>
                <div>
                    <ButtonSecondary onClick={openModalAmenities}>
                        Ver más
                    </ButtonSecondary>
                </div>
                {renderMotalAmenities()}
            </div>
        );
    };

    const renderMotalAmenities = () => {
        return (
            <Transition appear show={isOpenModalAmenities} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-50 overflow-y-auto"
                    onClose={closeModalAmenities}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40"/>
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
              &#8203;
            </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block py-8 h-screen w-full max-w-4xl">
                                <div
                                    className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                                    <div
                                        className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                                        <h3
                                            className="text-lg font-medium leading-6 text-gray-900"
                                            id="headlessui-dialog-title-70"
                                        >
                                            Comodidades
                                        </h3>
                                        <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities}/>
                    </span>
                                    </div>
                                    <div
                                        className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                                        {Amenities_demos.filter((_, i) => i < 1212).map((item) => (
                                            <div
                                                key={item.name}
                                                className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                                            >
                                                <i
                                                    className={`text-4xl text-neutral-6000 las ${item.icon}`}
                                                ></i>
                                                <span>{item.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        );
    };

    const renderSection6 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Reseñas</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

                {/* comment
                <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    <CommentListing className="py-8"/>
                    <CommentListing className="py-8"/>
                    <CommentListing className="py-8"/>
                    <CommentListing className="py-8"/>
                </div>
                */}
            </div>
        );
    };

    const renderSection7 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <div>
                    <h2 className="text-2xl font-semibold">Dirección</h2>
                    <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Gran Canaria - España
          </span>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>

                {/* MAP */}
                <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
                    <div className="rounded-xl overflow-hidden z-0">
                        <iframe
                            width="100%"
                            height="100%"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3525.112057378504!2d-15.389801024524726!3d27.92920977605606!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc40a266c3662d1d%3A0x824bcf7e159f85d4!2sGran%20Canaria%20Airport!5e0!3m2!1sen!2ses!4v1717954969953!5m2!1sen!2ses"
                        >
                        </iframe>
                    </div>
                </div>
            </div>
        )
            ;
    };

    const renderSection8 = () => {
        return (
            <div className="listingSection__wrap">
                {/* HEADING */}
                <h2 className="text-2xl font-semibold">Cosas que debes saber</h2>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>
                <div>
                    <span className="block mt-3 text-neutral-500 dark:text-neutral-400">
    <strong>Política de Cancelación</strong><br/><br/>
    Cancelación con Reembolso Completo:<br/><br/>
    • Los clientes pueden cancelar su reserva y recibir un reembolso completo del importe pagado si la cancelación se realiza al menos 30 días antes de la fecha de reserva programada.<br/>
    Cancelación sin Reembolso:<br/>
    • No se ofrecerán reembolsos para cancelaciones realizadas a partir del día 29 antes de la fecha de reserva y hasta la fecha de reserva programada.<br/>
    Procedimiento de Cancelación:<br/>
    • Las cancelaciones deben realizarse por escrito y enviarse a través de correo electrónico a <a href="mailto:inikcamper@gmail.com" className="text-blue-600">inikcamper@gmail.com</a>.<br/>
    • La fecha y hora de la cancelación se considerarán según la zona horaria local de Gran Canaria.<br/>
    Modificaciones de Reserva:<br/>
    • Las modificaciones de la reserva están sujetas a disponibilidad y pueden estar sujetas a tarifas adicionales.<br/>
    Contacto:<br/>
    • Para cancelar una reserva o para cualquier pregunta relacionada con nuestra política de cancelación, por favor póngase en contacto con nosotros a través de <a className="text-blue-600">+34684198547</a> o por correo electrónico a <a href="mailto:inikcamper@gmail.com" className="text-blue-600">inikcamper@gmail.com</a>.<br/>
    <br/>
</span>
                </div>


                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>

                {/* CONTENT */}
                <div>
                    <h4 className="text-lg font-semibold"></h4>
                    <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
                        <div
                            className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                            <span>Llegada</span>
                            <span>15:00</span>
                        </div>
                        <div className="flex space-x-10 justify-between p-3">
                            <span>Salida</span>
                            <span>12:00</span>
                        </div>
                    </div>
                </div>
                <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"/>
            </div>
        );
    };

    const renderSidebar = () => {
        return (
            <div className="listingSectionSidebar__wrap shadow-xl p-4 lg:p-6">
               <div id="apartmentIframeAll"></div>
                <h3 className="mt-4 text-lg font-semibold text-center">Reservas Externas</h3>
                <div className="flex justify-around mt-2">
                    <a href="https://www.airbnb.es/rooms/1156378133660074870?source_impression_id=p3_1717960191_P3ZuvpTNIHSf_rIG" target="_blank" rel="noopener noreferrer">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQujOkdW7NbL4MGxKaqcyXe-N5_T_TaXBNc5w&s" alt="Airbnb" className="w-8 h-8" />
                    </a>
                    <a href="https://www.yescapa.es/campers/79486" target="_blank" rel="noopener noreferrer">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2K5zAU3MdjX_tpHBy8uBcQdbGCZEe51bPOGr9p366Zb_E19D3liW6w-mgirZHZGLNsAg&usqp=CAU" alt="Yescapa" className="w-8 h-8" />
                    </a>
                    <a href="https://www.camplify.es/vehiculo/alquilar-furgoneta-camper-ojos-de-garza-inikcar/126829" target="_blank" rel="noopener noreferrer">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_xCbgnLLX21IxT8vpP6bcXqpD-2QTfx04A&s" alt="Campify" className="w-8 h-8" />
                    </a>
                </div>
            </div>
        );
    };

    return (
        <div className="nc-ListingStayDetailPage">
            {/*  HEADER */}
            <header className="rounded-md sm:rounded-xl">
                <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
                    <div
                        className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden cursor-pointer"
                        onClick={handleOpenModalImageGallery}
                    >
                        <Image
                            fill
                            className="object-cover rounded-md sm:rounded-xl"
                            src={PHOTOS[0]}
                            alt=""
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        />
                        <div
                            className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
                    </div>
                    {PHOTOS.filter((_, i) => i >= 1 && i < 5).map((item, index) => (
                        <div
                            key={index}
                            className={`relative rounded-md sm:rounded-xl overflow-hidden ${
                                index >= 3 ? "hidden sm:block" : ""
                            }`}
                        >
                            <div className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5">
                                <Image
                                    fill
                                    className="object-cover rounded-md sm:rounded-xl "
                                    src={item || ""}
                                    alt=""
                                    sizes="400px"
                                />
                            </div>

                            {/* OVERLAY */}
                            <div
                                className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                onClick={handleOpenModalImageGallery}
                            />
                        </div>
                    ))}

                    <button
                        className="absolute hidden md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
                        onClick={handleOpenModalImageGallery}
                    >
                        <Squares2X2Icon className="w-5 h-5"/>
                        <span className="ml-2 text-neutral-800 text-sm font-medium">
              Ver todas las fotos
            </span>
                    </button>
                </div>
            </header>

            {/* MAIN */}
            <main className="relative z-10 mt-11 flex flex-col lg:flex-row-reverse">
                {/* SIDEBAR */}
                <div className="lg:block lg:w-1/4 flex-grow mt-14 lg:mt-0 mb-8 lg:ml-8">
                    <div className="sticky top-28">
                        {isScriptLoaded && renderSidebar()}
                    </div>
                </div>

                {/* CONTENT */}
                <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
                    {renderSection1()}
                    {renderSection2()}
                    {renderSection3()}
                    {renderSection6()}
                    {renderSection7()}
                    {renderSection8()}
                </div>
            </main>
        </div>
    );
};

export default InikDarkDetailPage;
