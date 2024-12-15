import React, {useContext, useEffect, useState} from "react";
import {LanguageContext} from "@/context/LanguageContext";
import {translateText} from "@/utils/translate";

const LegalLinks: React.FC = () => {
    const [translatedTexts, setTranslatedTexts] = useState({
        terms: "Términos y condiciones de pago",
        paymentMethods: "Método de pago",
        privacyPolicy: "Política de privacidad",
        cancellationPolicy: "Política de cancelación",
        generalConditions: "Condiciones generales",
    });

    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("LanguageContext must be used within a LanguageProvider");
    }

    const {language} = context;

    useEffect(() => {
        const translateLinks = async () => {
            try {
                const translations = {
                    terms: await translateText("Términos y condiciones de pago", language),
                    paymentMethods: await translateText("Método de pago", language),
                    privacyPolicy: await translateText("Política de privacidad", language),
                    cancellationPolicy: await translateText("Política de cancelación", language),
                    generalConditions: await translateText("Condiciones generales", language),
                };
                setTranslatedTexts(translations);
            } catch (error) {
                console.error("Error translating legal links:", error);
            }
        };

        translateLinks();
    }, [language]);

    return (
        <div className="flex flex-wrap justify-center mt-4 gap-4">
            <a href="/TermsAndConditions"
               className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                {translatedTexts.terms}
            </a>
            <a href="/PaymentMethods"
               className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                {translatedTexts.paymentMethods}
            </a>
            <a href="/PrivacyPolicy"
               className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                {translatedTexts.privacyPolicy}
            </a>
            <a href="/CancellationPolicy"
               className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                {translatedTexts.cancellationPolicy}
            </a>
            <a href="/GeneralConditions"
               className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white">
                {translatedTexts.generalConditions}
            </a>
        </div>
    );
};

export default LegalLinks;