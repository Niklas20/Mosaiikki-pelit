import { useLocation, useNavigate } from "react-router-dom";
import "./MotiveScreen.css";
import { useTranslate } from "../../utils/translate";

/**
 * Motive screen component
 * 
 * @returns {JSX.Element} Motive screen component
 */

const MotiveScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const translate = useTranslate();

    const previousLink = location.state?.previousLink || "/";

    const handleButtonClick = () => {
        navigate(previousLink);
    }

    return (
        <div className="screen motive-screen">
            <div className="motive-screen-container">

                <h1 className="motive-screen-title">{translate("motive-screen-title")}</h1>
                
                <p className="motive-screen-text">
                    {translate("motive-screen-text-1")}
                </p>
                <p className="motive-screen-text">
                    {translate("motive-screen-text-2")}
                </p>
                <p className="motive-screen-text">
                    {translate("motive-screen-text-3")}
                </p>

                <button
                    className="motive-screen-button"
                    onClick={handleButtonClick}
                >
                    {translate("motive-screen-button")}
                </button>

            </div>
        </div>
    )
}

export default MotiveScreen;