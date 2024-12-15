import React from 'react';

const WhatsAppButton = () => {
    return (
        <a
            href="https://api.whatsapp.com/send/?phone=34684198547"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
            className="fixed bottom-20 right-4 bg-green-500 rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105 md:w-16 md:h-16 md:bottom-10 md:right-10 z-[1000]"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-7 h-7 md:w-8 md:h-8 text-white"
            >
                <path
                    fill="currentColor"
                    d="M16 0C7.164 0 0 7.163 0 16c0 2.938.777 5.75 2.25 8.25L0 32l8-2.25C10.25 31.222 13.062 32 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.25 23.875c-.348.975-1.77 1.768-2.77 2.002-.705.168-1.61.302-4.645-.994-3.875-1.593-6.334-5.506-6.523-5.772-.18-.254-1.554-2.07-1.554-3.96s.978-2.813 1.332-3.196c.346-.384.77-.48 1.029-.48.257 0 .514.003.742.013.23.01.575-.094.9.69.348.813 1.178 2.813 1.28 3.016.103.202.171.449.035.703-.137.254-.21.449-.413.69-.202.237-.426.53-.609.713-.202.203-.414.424-.18.82.235.399 1.048 1.72 2.25 2.78 1.547 1.376 2.852 1.802 3.252 1.998.401.202.63.168.866-.101.238-.268 1.003-1.18 1.273-1.588.268-.405.535-.337.899-.202.364.135 2.34 1.104 2.742 1.302.401.202.668.303.768.472.102.168.102.98-.247 1.955z"
                />
            </svg>
        </a>
    );
};

export default WhatsAppButton;