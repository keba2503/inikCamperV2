import Image from 'next/image';

const OfferGallery = () => {
    const images = [
        'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
        'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
        'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((src, index) => (
                <div key={index}>
                    <div className="relative w-full h-64">
                        <Image
                            className="h-auto max-w-full rounded-lg"
                            src={src}
                            alt={`Gallery image ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OfferGallery;
