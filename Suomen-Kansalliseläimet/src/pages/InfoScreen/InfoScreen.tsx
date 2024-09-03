import { useNavigate } from "react-router-dom";
import "./InfoScreen.css";
import { useTranslate } from "../../utils/translate";

const InfoScreen = () => {
    const navigate = useNavigate();
    const translate = useTranslate();

    const handleButtonClick = () => {
        navigate("/game");
    }

    return (
        <div className="screen info-screen">
            <div className="info-screen-container">
                <div>Info screen tekstit tähän</div>
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