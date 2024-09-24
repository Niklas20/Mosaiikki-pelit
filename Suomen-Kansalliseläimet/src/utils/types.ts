export type Language = "fi" | "en";

export interface Translations {
    [key: string]: {
        [language in Language]: string;
    };
}

/**
 * Author type
 * 
 * @param {string} name - Author name
 * @param {string} school - Author school
 * @param {string} degree - Author degree
 * @param {string} email - Author email
 * @param {string} github - Author GitHub
 * @param {string} linkedin - Author LinkedIn
 * @returns {Author} Author object
 */
export interface Author {
    name: string;
    school: string;
    degree: string;
    email: string;
    github: string;
    linkedin: string;
}

export interface Animal {
    id: number;
    name: {
        fi: string;
        en: string;
    };
    image: string;
    isFinnishNational: boolean;
    fact: {
        fi: string;
        en: string;
    };
}