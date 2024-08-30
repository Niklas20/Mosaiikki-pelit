import "./HintContainer.css";
import { useTranslate } from "@/Utils/translate";
import { Hint } from "@/Utils/types";

/**
 * Hint container properties
 */
interface HintContainerProps {
    className?: string;
    hints: Hint[];
}

/**
 * Hint container component
 * 
 * @param {HintContainerProps} props - Component properties
 * @param {string} props.className - Component class name
 * @param {Hint[]} props.hints - Array of hints to display
 * @returns {JSX.Element} Hint container component
 */
const HintContainer: React.FC<HintContainerProps> = ({ className, hints }) => {
    const translate = useTranslate();

    return (
        <div className={className}>
            <h3>{translate("hint-container-title")}</h3>
            {hints.map((hint, index) => (
                <div key={index} className="hint">
                    {hint.hint}
                    {hint.image && <img className="hint-image" src={hint.image} alt="Hint visual" />}
                </div>
            ))}
        </div>
    );
}

export default HintContainer;