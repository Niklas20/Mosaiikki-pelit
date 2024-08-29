import { Outlet, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from './Button/Button';
import exitButtonImage from "../../imgs/exitButton.png";
import infoButtonImage from "../../imgs/infoButton.png";
import motiveButtonImage from "../../imgs/motiveButton.png";
import languageButtonFi from "../../imgs/finButton.png";
import languageButtonEn from "../../imgs/engButton.png";
import finnishFlag from "../../imgs/finnishFlag.jpg";
import englishFlag from "../../imgs/englishFlag.jpg";
import Tooltip from './Tooltip/Tooltip';
import { useTranslate } from '@/Utils/translate';
import { useLanguage } from '@/contexts/LanguageProvider';
import { useGameOver } from '@/contexts/GameOverContext';
import { useGame } from '@/contexts/GameContext';

/**
 * Layout component
 * 
 * @returns {JSX.Element} Layout component
 */
const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const translate = useTranslate();
    const { language, setLanguage } = useLanguage();
    const { isGameOver } = useGameOver();
    const { resetGame } = useGame();

    const handleExitButtonClick = () => {
        resetGame();
        navigate("");
    }

    const handleInfoButtonClick = () => {
        navigate("/info");
    }

    // Handle the motive button click and pass the previous link as a state to get back to the correct screen
    const handleMotiveButtonClick = () => {
        navigate("/motive", { state: { previousLink: location.pathname } });
    }

    const handleLanguageChange = (lang: "fi" | "en") => {
        setLanguage(lang);
    };

    // Check if the current location is the main menu
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
                                disabled={isGameOver}
                            />
                        </Tooltip>
                        <Tooltip text={translate("tooltip-info")}>
                            <Button
                                className='info-button'
                                image={infoButtonImage}
                                onClick={handleInfoButtonClick}
                                disabled={isGameOver}
                            />
                        </Tooltip>
                        <Tooltip text={translate("tooltip-exit")}>
                            <Button
                                className='exit-button'
                                image={exitButtonImage}
                                onClick={handleExitButtonClick}
                                disabled={isGameOver}
                            />
                        </Tooltip>
                        <Tooltip text={translate("tooltip-language-fi")}>
                            <Button
                                className="language-button-fi"
                                image={languageButtonFi}
                                onClick={() => handleLanguageChange("fi")}
                                disabled={isGameOver}
                            />
                        </Tooltip>
                        <Tooltip text={translate("tooltip-language-en")}>
                            <Button
                                className="language-button-en"
                                image={languageButtonEn}
                                onClick={() => handleLanguageChange("en")}
                                disabled={isGameOver}
                            />
                        </Tooltip>
                    </>
                )}
            </div>
        </div>
    );
}

export default Layout;
