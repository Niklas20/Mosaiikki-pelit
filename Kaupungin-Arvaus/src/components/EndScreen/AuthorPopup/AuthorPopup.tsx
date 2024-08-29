import { Author } from "@/Utils/types";
import "./AuthorPopup.css";
import { useTranslate } from "@/Utils/translate";

/**
 * Author popup properties
 */
interface AuthorProps {
    authorData: Author;
    onClose: () => void;
}

/**
 * Author popup component
 * 
 * @param {AuthorProps} props - Component properties
 * @param {Author} props.authorData - Author data
 * @param {Function} props.onClose - Close event handler
 * @returns {JSX.Element} Author popup component
 */
const AuthorPopup = (props: AuthorProps) => {
    const { name, school, degree, email, github, linkedin } = props.authorData;

    const translate = useTranslate();

    return (
        <div className="author-popup-overlay" onClick={props.onClose}>
            <div className="author-popup" onClick={e => e.stopPropagation()}>
                <button className="author-popup-close" onClick={props.onClose}>X</button>
                <h2>{name}</h2>
                <p>{translate("author-popup-school", { school: school })}</p>
                <p>{translate("author-popup-degree", { degree: degree })}</p>
                {email && <p>{translate("author-popup-email", { email: email })}</p>}
                {github && (
                    <p>
                        Github: <a href={`https://${github}`} target="_blank" rel="noopener noreferrer">{github}</a>
                    </p>
                )}
                {linkedin && (
                    <p>
                        LinkedIn: <a href={`https://${linkedin}`} target="_blank" rel="noopener noreferrer">{linkedin}</a>
                    </p>
                )}
            </div>
        </div>
    )
}

export default AuthorPopup;