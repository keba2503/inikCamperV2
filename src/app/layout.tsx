import ClientCommons from './ClientCommons';
import './globals.css';
import '@/fonts/line-awesome-1.3.0/css/line-awesome.css';
import '@/styles/index.scss';
import 'rc-slider/assets/index.css';
import Footer from '@/components/Footer';
import { Metadata } from 'next';
import ClientWrapper from '../components/ClientWrapper';
import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import WhatsAppButton from '../components/WhatsAppButton';
import dynamic from "next/dynamic";

const PixelTracker = dynamic(() => import("../components/PixelTracker"), { ssr: false });

export const metadata: Metadata = {
    title: 'InikCamper - Booking CamperVan',
    description: 'Booking online',
    keywords: 'Booking online',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
        <body className="bg-custom text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <LanguageProvider>
            <PixelTracker />
            <ClientCommons />
            <ClientWrapper>{children}</ClientWrapper>
            <Footer />
            <WhatsAppButton />
        </LanguageProvider>
        </body>
        </html>
    );
}
