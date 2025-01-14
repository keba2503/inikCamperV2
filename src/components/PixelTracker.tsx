'use client'

import { useEffect } from "react";
import ReactPixel from "react-facebook-pixel";

const PixelTracker = () => {
    useEffect(() => {
        const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
        if (pixelId) {
            ReactPixel.init(pixelId);
            ReactPixel.pageView();
            console.log("Facebook Pixel inicializado");
        } else {
            console.error("El ID del Pixel de Facebook no está configurado");
        }
    }, []);

    return null;
};
export default PixelTracker;
