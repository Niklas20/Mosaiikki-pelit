import { useLocation, useNavigate } from "react-router-dom";
import "./EndScreen.css";
import { useState } from "react";
import authorData from "@/data/AuthorData.json";
import AuthorPopup from "@/components/EndScreen/AuthorPopup/AuthorPopup";
import { useTranslate } from "@/Utils/translate";
import HintContainer from "@/components/GameScreen/HintContainer/HintContainer";

const EndScreen = () => {
    const [visibleAuthors, setVisibleAuthors] = useState<string | null>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const translate = useTranslate();

    const points = location.state?.points;
    const city = location.state?.city;
    const timeElapsed = location.state?.timeElapsed;
    const hints = location.state?.hints || [];  

    const handleButtonClick = () => {
        navigate("/game");
    }

    const openAuthorPopup = (authorName: string) => {
        setVisibleAuthors(authorName);
    }

    const closeAuthorPopup = () => {
        setVisibleAuthors(null);
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    };

    const getCityCOA = (coaPath: string) => {
        try {
            return require(`${coaPath}`);
        } catch (err) {
            console.error(`Could not load image in path: ${coaPath}`, err);
            return null;
        }
    };

    return (
        <div className="screen end-screen">
            <h1 className="end-screen-title">{translate("end-screen-title")}</h1>
            <h3 className="end-screen-time">{translate("end-screen-time", { time: formatTime(timeElapsed) })}</h3>
            <h2 className="end-screen-points">{translate("end-screen-points", { points: points })}</h2>
            <h3 className="end-screen-city">{translate("end-screen-city", { city: city.name })}</h3>

            {city?.coa && (
                <img
                    className="end-screen-coa"
                    src="/src/imgs/vaakunaImgs/Tempvaakuna.jpg"
                    alt={`${city.name} Coat of Arms`}
                />
            )}

            <HintContainer
                className="end-screen-hint-container"
                hints={hints}
            />

            <button
                className="end-screen-restart-button"
                onClick={handleButtonClick}
            >
                {translate("end-screen-restart-button")}
            </button>

            <div className="end-screen-author-container">
                <h2 className="author-title">{translate("author-title")}</h2>
                {authorData.authors.map(author => (
                    <div
                        className="author"
                        key={author.name}
                        onClick={() => openAuthorPopup(author.name)}
                    >
                        <p>{author.name}</p>
                    </div>
                ))}
            </div>

            {visibleAuthors && (
                <AuthorPopup
                    authorData={authorData.authors.find(author => author.name === visibleAuthors)!}
                    onClose={closeAuthorPopup}
                />
            )}
        </div>
    );
}

export default EndScreen;