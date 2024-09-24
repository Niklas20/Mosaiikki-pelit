import "./GameScreen.css";
import { useLocation } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import { useTranslate } from "../../utils/translate";
import { useNavigate } from "react-router-dom";
import animalData from "../../data/Animals.json";

interface GameScreenProps {
    preloadedImages: Record<string, HTMLImageElement>;
}

const GameScreen = (props: GameScreenProps) => {
    const { preloadedImages } = props;

    const location = useLocation();
    const spinnerType = location.state?.spinnerType as keyof typeof animalData;
    const selectedAnimals = animalData[spinnerType];

    const navigate = useNavigate();
    const translate = useTranslate();

    const handleButtonClick = () => {
        navigate("/pregame");
    }

    return (
        <div className="screen">
            {selectedAnimals.length > 0 && (
                <Spinner animals={selectedAnimals} preloadedImages={preloadedImages} />
            )}

            <button
                className="game-screen-back-button"
                onClick={handleButtonClick}
            >
                {translate("game-screen-back-button")}
            </button>
        </div>
    );
};

export default GameScreen;