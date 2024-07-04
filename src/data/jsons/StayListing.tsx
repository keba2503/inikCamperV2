import imgInikdark1 from '@/images/Exteriores/inikdark/1.png';
import imgInikdark2 from '@/images/Exteriores/inikdark/2.png';
import imgInikdark3 from '@/images/Exteriores/inikdark/3.png';
import imgInikdark4 from '@/images/Exteriores/inikdark/4.png';
import imgInikdark5 from '@/images/Exteriores/inikdark/5.png';

import imgIniklight1 from '@/images/Exteriores/iniklight/1.jpg';
import imgIniklight2 from '@/images/Exteriores/iniklight/2.jpg';
import imgIniklight3 from '@/images/Exteriores/iniklight/3.jpg';
import imgIniklight4 from '@/images/Exteriores/iniklight/4.jpg';
import imgIniklight5 from '@/images/Exteriores/iniklight/5.jpg';

import imgInikcar1 from '@/images/Exteriores/inikcar/1.jpg';
import imgInikcar2 from '@/images/Exteriores/inikcar/2.jpg';
import imgInikcar3 from '@/images/Exteriores/inikcar/3.jpg';
import imgInikcar4 from '@/images/Exteriores/inikcar/4.jpg';
import imgInikcar5 from '@/images/Exteriores/inikcar/5.jpg';

const listings = [
    {
        id: "id_1",
        authorId: 6,
        date: "May 20, 2021",
        href: "/inikdark",
        listingCategoryId: 11,
        title: "Inikdark",
        featuredImage: imgInikdark1.src,
        galleryImgs: [
            imgInikdark1.src,
            imgInikdark2.src,
            imgInikdark3.src,
            imgInikdark4.src,
            imgInikdark5.src,
        ],
        commentCount: 47,
        viewCount: 843,
        like: true,
        address: "Gran Canaria",
        reviewStart: 3.6,
        reviewCount: 16,
        price: "",
        maxGuests: 9,
        bedrooms: 9,
        bathrooms: 8,
        saleOff: null,
        isAds: null,
        map: { lat: 55.247483, lng: 61.5229791 },
    },
    {
        id: "id_2",
        authorId: 6,
        date: "May 20, 2021",
        href: "/iniklight",
        listingCategoryId: 11,
        title: "Iniklight",
        featuredImage: imgIniklight1.src,
        galleryImgs: [
            imgIniklight1.src,
            imgIniklight2.src,
            imgIniklight3.src,
            imgIniklight4.src,
            imgIniklight5.src,
        ],
        commentCount: 47,
        viewCount: 843,
        like: true,
        address: "Gran Canaria",
        reviewStart: 3.6,
        reviewCount: 16,
        price: "",
        maxGuests: 9,
        bedrooms: 9,
        bathrooms: 8,
        saleOff: null,
        isAds: null,
        map: { lat: 55.247483, lng: 61.5229791 },
    },
    {
        id: "id_3",
        authorId: 6,
        date: "May 20, 2021",
        href: "/inikcar",
        listingCategoryId: 11,
        title: "Inikcar",
        featuredImage: imgInikcar1.src,
        galleryImgs: [
            imgInikcar1.src,
            imgInikcar2.src,
            imgInikcar3.src,
            imgInikcar4.src,
            imgInikcar5.src,
        ],
        commentCount: 47,
        viewCount: 843,
        like: true,
        address: "Gran Canaria",
        reviewStart: 3.6,
        reviewCount: 16,
        price: "",
        maxGuests: 9,
        bedrooms: 1,
        bathrooms: 8,
        saleOff: null,
        isAds: null,
        map: { lat: 55.247483, lng: 61.5229791 },
    }
];

export default listings;
