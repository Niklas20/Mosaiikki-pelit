import { useEffect, useRef, useState } from "react";
import CityData from "../../data/Cities.json";
import "./GameScreen.css";
import { getRandomCity } from "@/Utils/gameUtils";
import { City, Hint } from "@/Utils/types";
import SearchBarWithPills from "@/components/GameScreen/SearchBarWithPills/SearchBarWithPills";
import HintContainer from "@/components/GameScreen/HintContainer/HintContainer";
import Magnify from "../../imgs/magnify.png";
import HintIcon from "../../imgs/plusLetter.png";
import Tooltip from "@/components/common/Tooltip/Tooltip";
import { useNavigate } from "react-router-dom";
import { useTranslate } from "@/Utils/translate";
import { useGameOver } from "@/contexts/GameOverContext";
import Button from "@/components/common/Button/Button";
import { useGame } from "@/contexts/GameContext";

/**
 * Game screen properties
 */
interface GameScreenProps {
    preloadedImages: Record<string, HTMLImageElement>;
}

/**
 * Game screen component
 * 
 * @param {GameScreenProps} props - Component properties
 * @param {Record<string, HTMLImageElement>} props.preloadedImages - Preloaded images
 * @returns {JSX.Element} Game screen component
 */
const GameScreen = (props: GameScreenProps) => {
    const {
        city, setCity,
        revealedLetters, setRevealedLetters,
        hintIndex, setHintIndex,
        points, setPoints,
        timeElapsed, setTimeElapsed,
        hintsUsed, setHintsUsed,
        addHint,
        resetGame
    } = useGame();

    const initialized = useRef(false);
    const [hints, setHints] = useState<Hint[]>([]); // Initialize hints state
    const [showImageScreen, setShowImageScreen] = useState(false);
    const maxHints = 3;
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();
    const translate = useTranslate();
    const { isGameOver, endGame, resetGameState } = useGameOver();

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        if (!city) {
            const randomCity = getRandomCity(CityData.cities);

            if (randomCity) {
                setCity(randomCity);
                const cityLetters = randomCity.name.split("");
                const initialRevealedLetters = new Array(cityLetters.length).fill("_");

                // Reveal one random letter
                const randomIndex = Math.floor(Math.random() * cityLetters.length);
                initialRevealedLetters[randomIndex] = cityLetters[randomIndex];

                setRevealedLetters(initialRevealedLetters);
            }

            setTimeElapsed(0);
        }

        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setTimeElapsed(prevTime => prevTime + 1);
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Check if game is over
        if (revealedLetters.join("") === city?.name || points <= 0) {
            if (timerRef.current) clearInterval(timerRef.current);
            endGame();

            const timeout = setTimeout(() => {
                resetGameState();
                resetGame();
                navigate("/end", { state: { points: Math.max(points, 0), city, timeElapsed, hints } });
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [revealedLetters, points, city, navigate, timeElapsed, hints]);

    const handleCitySelect = (selectedCity: City) => {
        if (selectedCity.name !== city?.name) {
            handleWrongCitySelect();
        } else {
            handleRightCitySelect();
        }
    };

    const handleWrongCitySelect = () => {
        if (city) {
            const hints = [
                translate("hint-population", { population: city.population.toString() }),
                translate("hint-founded", { founded: city.founded.toString() }),
                translate("hint-size", { size: city.size }),
                translate("hint-image")
            ];

            const newHint: Hint = {
                hint: hints[hintIndex],
            };

            if (hintIndex === hints.length - 1) {
                newHint.image = city.estimate_image;
            }

            if (hintIndex < hints.length) {
                addHint(newHint);
                setHints(prevHints => [...prevHints, newHint]);
                setHintIndex(hintIndex + 1);
                setPoints(prevPoints => prevPoints - 200);
            }
        }
    };

    const handleRightCitySelect = () => {
        if (city) {
            const cityLetters = city.name.split("");
            setRevealedLetters(cityLetters);
        }
    };

    // Find image from preloaded images, if it does not exist return null
    const findGameImage = (imagePath: string, images: Record<string, HTMLImageElement>) => {
        for (const key in images) {
            if (images[key].src.includes(imagePath)) {
                return images[key];
            }
        }
        return null;
    };

    const handleImageClick = () => {
        setShowImageScreen(true);
    };

    const handleCloseImageScreen = () => {
        setShowImageScreen(false);
    };

    // Hint button click handler
    const handleHintClick = () => {
        if (hintsUsed < maxHints && city) {
            const cityLetters = city.name.split("");
            const revealedLettersCopy = [...revealedLetters];

            // Find all unrevealed indices
            const unrevealedIndices = revealedLettersCopy
                .map((letter, index) => (letter === "_" ? index : -1))
                .filter(index => index !== -1);

            if (unrevealedIndices.length > 0) {
                const randomIndex = unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
                revealedLettersCopy[randomIndex] = cityLetters[randomIndex];
                setRevealedLetters(revealedLettersCopy);

                const newHint: Hint = {
                    hint: translate("hint-new-letter", { letter: cityLetters[randomIndex] })
                };
                addHint(newHint);
                setHints(prevHints => [...prevHints, newHint]);
                setHintsUsed(prevHintsUsed => prevHintsUsed + 1); // Increment hint counter
                setPoints(prevPoints => prevPoints - 150); // Remove points
            } else {
                console.log("No letters left to reveal.");
            }
        }
    };

    // Format time to minutes and seconds
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`; // Ensures two-digit seconds
    };

    if (showImageScreen && city) {
        const gameImageSrc = findGameImage(city.image || "", props.preloadedImages)?.src;
        return (
            <div className="image-screen">
                <img className="full-screen-image" src={gameImageSrc} />
                <button className="game-screen-close-button" onClick={handleCloseImageScreen}>
                    {translate("game-screen-close-button")}
                </button>
            </div>
        );
    }

    return (
        <div className="screen game-screen">
            <div className="game-container">
                <div className="letter-container">
                    {revealedLetters.map((letter, index) => (
                        <div key={index} className="letter">
                            {letter}
                        </div>
                    ))}
                </div>

                <div className="game-screen-hint-button-container">
                    <Tooltip
                        text={`${translate("tooltip-hint")}\n(${maxHints - hintsUsed} ${translate("hints-left")})`}
                        width="131px" // Custom width to button tooltip
                    >
                        <Button
                            className="game-screen-hint-button"
                            image={HintIcon}
                            onClick={handleHintClick}
                            disabled={isGameOver || hintsUsed >= maxHints} // Disables button if game ends or you used too many hints
                        />
                    </Tooltip>
                </div>

                <div className="game-screen-image-container">
                    <img
                        className="game-screen-magnify"
                        src={Magnify}
                        onClick={handleImageClick}
                    />
                    <img
                        className="game-screen-image"
                        src={findGameImage(city?.image || "", props.preloadedImages)?.src}
                        onClick={handleImageClick}
                    />
                </div>

                <HintContainer
                    className="game-screen-hint-container"
                    hints={hints}
                />

                <SearchBarWithPills
                    className="game-screen-search-bar"
                    placeholder={translate("game-screen-search-bar-placeholder")}
                    cityData={CityData.cities}
                    onCitySelect={handleCitySelect}
                    isGameOver={isGameOver}
                />

                <div className="game-screen-points">{translate("game-screen-points", { points: points.toString() })}</div>

                <div className="game-screen-timer"> {formatTime(timeElapsed)} </div>
            </div>
        </div>
    );
};

export default GameScreen;