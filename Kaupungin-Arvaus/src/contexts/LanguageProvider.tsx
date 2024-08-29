import { Language } from "@/Utils/types";
import React, { createContext, ReactNode, useContext, useState } from "react";

/**
 * Language context properties
 */
interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
}

// Create language context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Language provider
 * 
 * @param {React.ReactNode} props.children - Child elements
 * @returns {JSX.Element} Language provider
 */
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>("fi");

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

/**
 * useLanguage hook
 * 
 * @returns {LanguageContextType} Language context properties
 */
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export default LanguageContext;