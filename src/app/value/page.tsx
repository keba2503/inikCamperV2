import React from "react";

const Page = () => {
    return (
        <div className="relative">
            <div
                className="h-screen bg-fixed bg-center bg-cover flex items-center"
                style={{backgroundImage: "url('https://rvdmediagroup.com/wp-content/uploads/2018/01/Roque-Nublo1.jpg')"}}
            >
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="container mx-auto py-8 lg:py-28 space-y-10 lg:space-y-28 bg-white relative z-10 p-8 rounded-2xl" style={{marginTop: '30vh'}}>
                    <div className="nc-SectionFounder relative">
                        <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                            <h2 className="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-black">
                                Nuestros Valores
                            </h2>
                            <p>Somos INIK, una familia enamorada de viajar a nuestro propio ritmo por cualquier lugar. Esta pasión por la libertad y la aventura nos llevó a crear INIK Camper, un proyecto nacido del corazón y nuestra experiencia viajera. Queremos compartir con ustedes la magia de explorar el mundo a su propio ritmo, especialmente la hermosa isla de Gran Canaria.</p>
                            <p><br/></p>
                            <p>En INIK Camper, creemos que cada viaje es una oportunidad para volver a conectar con uno mismo, para descubrir nuevos horizontes y crear recuerdos inolvidables. Nos dedicamos a ayudar a las personas a vivir estas experiencias de una manera única, libre de prisas y lejos de las masas. Queremos que cada rincón descubierto y cada momento vivido se conviertan en parte de su historia personal.</p>
                            <p><br/></p>
                            <p>Nuestro deseo es que, al elegirnos, no solo encuentren un vehículo para su viaje, sino también un aliado en su aventura, y que INIK Camper se convierta en parte de sus recuerdos más queridos. Esperamos marcar la diferencia en su experiencia de descubrir Gran Canaria, ofreciéndoles una forma auténtica y personalizada de explorar esta increíble isla.</p>
                            <br/>
                            <p>
                                <strong>Misión:&nbsp;</strong>Ofrecer un servicio personalizado y de calidad de experiencias turísticas en camper vans.
                            </p>
                            <p>
                                <strong>Visión:</strong>&nbsp;Conquistar esta rama del turismo en España y Europa con nuestro concepto.
                            </p>
                            <p>
                                <strong>Valores: Transparencia, Calidad de servicio, Trabajo en equipo, Sostenibilidad </strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
