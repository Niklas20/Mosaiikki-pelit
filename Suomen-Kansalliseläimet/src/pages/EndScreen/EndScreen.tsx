import "./EndScreen.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import authorData from "../../data/AuthorData.json";
import AuthorPopup from "../../components/EndScreen/AuthorPopup/AuthorPopup";
import { useTranslate } from "../../utils/translate";

const EndScreen = () => {
    const [visibleAuthors, setVisibleAuthors] = useState<string | null>(null);

    const translate = useTranslate();
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate("/game");
    }

    const openAuthorPopup = (authorName: string) => {
        setVisibleAuthors(authorName);
    }

    const closeAuthorPopup = () => {
        setVisibleAuthors(null);
    }


    return (
        <div className="screen">
            <h1 className="end-screen-title">{translate("end-screen-title")}</h1>

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