import { useContext } from "react";
import translationsData from "../data/Translations.json";
import LanguageContext from "../contexts/LanguageProvider";
import { Translations } from "./types";

const translations = translationsData as Translations;

export const useTranslate = () => {
    const context = useContext(LanguageContext);

    if (context === undefined) {
        throw new Error('useTranslate must be used within a LanguageProvider');
    }

    const { language } = context;

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