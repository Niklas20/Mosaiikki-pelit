import { useNavigate } from "react-router-dom";
import "./InfoScreen.css";
import { useTranslate } from "../../utils/translate";

const InfoScreen = () => {
    const navigate = useNavigate();
    const translate = useTranslate();

    const handleButtonClick = () => {
        navigate("/pregame");
    }

    return (
        <div className="screen info-screen">
            <div className="info-screen-container">
                <div>
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
                </div>
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