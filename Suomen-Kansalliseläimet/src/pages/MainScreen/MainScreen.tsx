import { useNavigate } from "react-router-dom";
import { useTranslate } from "../../utils/translate";
import "./MainScreen.css";

const MainScreen = () => {
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
        </div>
    )
}

export default MainScreen;