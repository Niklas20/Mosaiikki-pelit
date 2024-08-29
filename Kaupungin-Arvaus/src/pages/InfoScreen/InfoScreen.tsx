import { useNavigate } from "react-router-dom";
import "./InfoScreen.css";
import { useTranslate } from "@/Utils/translate";

/**
 * Info screen component
 * 
 * @returns {JSX.Element} Info screen component
 */
const InfoScreen = () => {
    const navigate = useNavigate();
    const translate = useTranslate();

    const handleButtonClick = () => {
        navigate("/game");
    }

    return (
        <div className="screen info-screen">
            <div className="info-screen-container">
                <h1 className="info-screen-title">{translate("info-screen-title")}</h1>
                <p className="info-screen-text">
                    {translate("info-screen-text-1")}
                </p>
                <p className="info-screen-text">
                    {translate("info-screen-text-2")}
                </p>
                <p className="info-screen-text">
                    {translate("info-screen-text-3")}
                </p>

                <h2 className="info-screen-subtitle">{translate("info-screen-subtitle")}</h2>
                <p className="info-screen-text">
                    {translate("info-screen-text-4")}
                </p>
                <p className="info-screen-text">
                    {translate("info-screen-text-5")}
                </p>
                <p className="info-screen-text">
                    {translate("info-screen-text-6")}
                </p>
                <p className="info-screen-text">
                    {translate("info-screen-text-7")}
                </p>
                <button
                    className="info-screen-button"
                    onClick={handleButtonClick}
                >
                    {translate("info-screen-button")}
                </button>
            </div>
        </div>
    )
}

export default InfoScreen;