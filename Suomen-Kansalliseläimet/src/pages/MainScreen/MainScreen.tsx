import { useTranslate } from "../../utils/translate";
import "./MainScreen.css";

const MainScreen = () => {
    const translate = useTranslate();

    return (
        <div className="screen main-screen">
            <h1 className="main-screen-title">{translate("main-screen-title")}</h1>
        </div>
    )
}

export default MainScreen;