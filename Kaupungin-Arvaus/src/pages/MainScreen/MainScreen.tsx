import { useNavigate } from "react-router-dom";
import { useTranslate } from "@/Utils/translate";
import "./MainScreen.css";
import mapOfFinland from '../../imgs/mapOfFinland.png';

/**
 * Main menu component
 * 
 * @returns {JSX.Element} Main menu component
 */
const MainMenu = () => {
    const navigate = useNavigate();
    const translate = useTranslate();

    const handleButtonClick = () => {
        navigate("/info");
    }

    return (
        <div className="screen main-screen">
            <h1 className="main-screen-title">{translate("main-screen-title")}</h1>
            <button
                className="main-screen-button"
                onClick={handleButtonClick}
            >
                {translate("main-screen-button")}
            </button>

            <img src={mapOfFinland} className="img main-screen-image" />
        </div>
    )
}

export default MainMenu;