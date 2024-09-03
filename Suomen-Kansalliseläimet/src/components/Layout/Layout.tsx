import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Layout.css";
import { useLanguage } from "../../contexts/LanguageProvider";
import Tooltip from "../Tooltip/Tooltip";
import Button from "../Button/Button";
import { useTranslate } from "../../utils/translate";
import exitButtonImage from "../../imgs/buttons/exitButton.png";
import infoButtonImage from "../../imgs/buttons/infoButton.png";
import motiveButtonImage from "../../imgs/buttons/motiveButton.png";
import languageButtonFi from "../../imgs/buttons/finButton.png";
import languageButtonEn from "../../imgs/buttons/engButton.png";
import finnishFlag from "../../imgs/buttons/finnishFlag.jpg";
import englishFlag from "../../imgs/buttons/englishFlag.jpg";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const translate = useTranslate();
    const { language, setLanguage } = useLanguage();

    const handleExitButtonClick = () => {
        //resetGame();
        navigate("");
    }

    const handleInfoButtonClick = () => {
        navigate("/info");
    }

    const handleMotiveButtonClick = () => {
        navigate("/motive", { state: { previousLink: location.pathname } });
    }

    const handleLanguageChange = (lang: "fi" | "en") => {
        setLanguage(lang);
    };

    const isMainMenu = location.pathname === "/";

    return (
        <div className="layout-container">
            <Outlet />
            <div className="buttons-container">
                {isMainMenu ? (
                    <>
                        <div className='big-button-container'>
                            <Button
                                className={`big-language-button-fi ${language === "fi" ? "big-language-button-selected" : ""}`}
                                onClick={() => handleLanguageChange("fi")}
                                image={finnishFlag}
                                text={translate("main-screen-big-language-button-fi")}
                            />
                            <Button
                                className={`big-language-button-en ${language === "en" ? "big-language-button-selected" : ""}`}
                                onClick={() => handleLanguageChange("en")}
                                image={englishFlag}
                                text={translate("main-screen-big-language-button-en")}
                            />
                        </div>
                    </>
                ) : (
                    <>
                        <Tooltip text={translate("tooltip-motive")}>
                            <Button
                                className='motive-button'
                                image={motiveButtonImage}
                                onClick={handleMotiveButtonClick}
                            //disabled={isGameOver}
                            />
                        </Tooltip>
                        <Tooltip text={translate("tooltip-info")}>
                            <Button
                                className='info-button'
                                image={infoButtonImage}
                                onClick={handleInfoButtonClick}
                            //disabled={isGameOver}
                            />
                        </Tooltip>
                        <Tooltip text={translate("tooltip-exit")}>
                            <Button
                                className='exit-button'
                                image={exitButtonImage}
                                onClick={handleExitButtonClick}
                            //disabled={isGameOver}
                            />
                        </Tooltip>
                        <Tooltip text={translate("tooltip-language-fi")}>
                            <Button
                                className="language-button-fi"
                                image={languageButtonFi}
                                onClick={() => handleLanguageChange("fi")}
                            //disabled={isGameOver}
                            />
                        </Tooltip>
                        <Tooltip text={translate("tooltip-language-en")}>
                            <Button
                                className="language-button-en"
                                image={languageButtonEn}
                                onClick={() => handleLanguageChange("en")}
                            //disabled={isGameOver}
                            />
                        </Tooltip>
                    </>
                )}
            </div>
        </div>
    );
}

export default Layout;