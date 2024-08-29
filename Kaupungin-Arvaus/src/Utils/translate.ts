import { useContext } from "react";
import { Translations } from "./types";
import translationsData from "@/data/Translations.json";
import LanguageContext from "@/contexts/LanguageProvider";

const translations = translationsData as Translations;

/**
 * Translate hook
 * 
 * @returns {Function} Translate function
 */
export const useTranslate = () => {
    const context = useContext(LanguageContext);

    if (context === undefined) {
        throw new Error('useTranslate must be used within a LanguageProvider');
    }

    const { language } = context;

    /**
     * Translate function
     * 
     * @param {string} key - Translation key
     * @param {Record<string, string | number>} [variables] - Variables to replace in the translation
     * @returns {string} Translated string
     */
    const translate = (key: string, variables?: Record<string, string | number>): string => {
        const translation = translations[key as keyof Translations];
        let translatedString = translation ? translation[language] || key : key;

        if (variables) {
            Object.keys(variables).forEach(variable => {
                const value = variables[variable];
                translatedString = translatedString.replace(`{${variable}}`, String(value));
            });
        }

        return translatedString;
    };

    return translate;
};