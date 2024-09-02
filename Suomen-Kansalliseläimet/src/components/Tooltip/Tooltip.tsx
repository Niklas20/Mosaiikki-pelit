import { useState } from "react";
import "./Tooltip.css";

/**
 * Tooltip component properties
 */

interface TooltipProps {
    text: string;
    children: React.ReactNode;
    width?: string;  // Optional width property
    height?: string; // Optional height property
}

/**
 * Tooltip component
 * 
 * @param {TooltipProps} props - Component properties
 * @param {string} props.text - Tooltip text
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} [props.width] - Tooltip width
 * @param {string} [props.height] - Tooltip height
 * @returns {JSX.Element} Tooltip component
 */

const Tooltip = (props: TooltipProps) => {
    const [showTooltip, setShowTooltip] = useState<boolean>(false);

    // Inline styles for dynamic width and height
    const tooltipStyle = {
        width: props.width || 'auto',
        height: props.height || 'auto',
    };

    return (
        <div
            className="tooltip-container"
            onMouseEnter={() => setShowTooltip(true)} // Mouse enters container = show tooltip
            onMouseLeave={() => setShowTooltip(false)} // Mouse leaves container = hide tooltip
        >
            <div className="tooltip-icon">
                {props.children}
            </div>
            <div 
                className={`tooltip-text ${showTooltip ? 'show' : ''}`} // Apply show class to make tooltip visible
                style={tooltipStyle} // Apply width and height style based on TooltipProps
            >
                {props.text}
            </div>
        </div>
    );
}

export default Tooltip;