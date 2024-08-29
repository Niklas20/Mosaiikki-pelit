import { City } from "./types";

let shownCities: City[] = [];

/**
 * Get random city from the list
 * 
 * @param {City[]} cities - List of cities
 * @returns {City} Random city
 */
export const getRandomCity = (cities: City[]): City => {
    if (shownCities.length === cities.length) {
        shownCities = [];
    }

    const remainingCities = cities.filter(city => !shownCities.includes(city));
    const randomCity = remainingCities[Math.floor(Math.random() * remainingCities.length)];
    shownCities.push(randomCity);

    return randomCity;
}