import { useState } from "react";
import "./SearchBarWithPills.css";
import { City } from "@/Utils/types";
import { useTranslate } from "@/Utils/translate";

/**
 * SearchBarWithPills properties
 */
interface SearchBarWithPillsProps {
    className?: string;
    placeholder: string;
    cityData: City[];
    onCitySelect?: (city: City) => void;
    isGameOver: boolean;
}

/**
 * SearchBarWithPills component
 * 
 * @param {SearchBarWithPillsProps} props - Component properties
 * @param {string} props.className - CSS class name
 * @param {string} props.placeholder - Input placeholder text
 * @param {City[]} props.cityData - City data
 * @param {Function} props.onCitySelect - City select event handler
 * @param {boolean} props.isGameOver - Is game over
 * @returns {JSX.Element} SearchBarWithPills component
 */
const SearchBarWithPills = (props: SearchBarWithPillsProps) => {
    const [search, setSearch] = useState("");
    const translate = useTranslate();

    // Handle pill click event and call onCitySelect event handler
    const handlePillClick = (city: City) => {
        if (!props.isGameOver && props.onCitySelect) {
            props.onCitySelect(city);
        }
    }

    // Filter cities based on search input
    const options = props.cityData
        .filter((city) => city.name.toLowerCase().includes(search.toLowerCase()))
        .map((city) => (
            <div
                key={city.name}
                className={`pill ${props.isGameOver ? "pill-disabled" : ""}`}
                onClick={() => handlePillClick(city)}
            >
                {city.name}
            </div>
        ));

    return (
        <div className={props.className}>
            <input
                type="text"
                placeholder={props.placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={props.isGameOver}
            />
            <div className="scroll-container">
                {options.length > 0 ? options : <div className="no-results">{translate("no-results")}</div>}
            </div>
        </div>
    )
}

export default SearchBarWithPills;