/**
 * Language type
 */
export type Language = "fi" | "en";

/**
 * Translations type
 * 
 * @param {string} key - Translation key
 * @param {Language} language - Translation language
 * @returns {string} Translation value
 */
export interface Translations {
    [key: string]: {
        [language in Language]: string;
    };
}

/**
 * City type
 * 
 * @param {string} name - City name
 * @param {string} image - City image
 * @param {string} estimate_image - City estimate image
 * @param {number} founded - City founded year
 * @param {string} size - City size
 * @param {number} population - City population
 * @returns {City} City object
 */
export interface City {
    name: string;
    image: string;
    estimate_image: string;
    founded: number;
    size: string;
    population: number;
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

/**
 * Hint type
 * 
 * @param {string} hint - Hint text
 * @param {string} image - Hint image
 * @returns {Hint} Hint object
 */
export interface Hint {
    hint: string;
    image?: string;
}