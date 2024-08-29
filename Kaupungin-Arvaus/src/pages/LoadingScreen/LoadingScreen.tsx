import { useTranslate } from "@/Utils/translate";
import "./LoadingScreen.css";

/**
 * Loading screen component
 * 
 * @returns {JSX.Element} Loading screen component
 */
const LoadingScreen = () => {
    const translate = useTranslate();

    return (
        <div className="screen loading-screen">
            <div className="ring">
                <div className="loadingText">{translate("loading-screen-text")}</div>
                <span></span>
            </div>
        </div>
    );
}

export default LoadingScreen;