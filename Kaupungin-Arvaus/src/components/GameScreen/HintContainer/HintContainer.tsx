import "./HintContainer.css";
import { useTranslate } from "@/Utils/translate";
import { useGame } from "@/contexts/GameContext";

/**
 * Hint container properties
 */
interface HintContainerProps {
    className?: string;
}

/**
 * Hint container component
 * 
 * @param {HintContainerProps} props - Component properties
 * @param {string} props.className - Component class name
 * @returns {JSX.Element} Hint container component
 */
const HintContainer = ((props: HintContainerProps) => {
    const { hints } = useGame();
    const translate = useTranslate();

    return (
        <div className={props.className}>
            <h3>{translate("hint-container-title")}</h3>
            {hints.map((hint, index) => (
                <div key={index} className="hint">
                    {hint.hint}
                    {hint.image && <img className="hint-image" src={hint.image} />}
                </div>
            ))}
        </div>
    );
})

export default HintContainer;