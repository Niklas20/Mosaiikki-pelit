import { useState, useEffect } from "react";
import { Animal } from "../../utils/types";
import "./Spinner.css";
import { useTranslate } from "../../utils/translate";
import { useLanguage } from "../../contexts/LanguageProvider";
import ConfettiComponent from "../../components/Confetti/Confetti";
import { useNavigate } from "react-router-dom";
import AnimalFactModal from "../AnimalFactModal/AnimalFactModal";

interface SpinnerProps {
    animals: Animal[];
    preloadedImages: Record<string, HTMLImageElement>;
}

const Spinner = ({ animals, preloadedImages }: SpinnerProps) => {
    const [isRolling, setIsRolling] = useState(false);
    const [generatedAnimals, setGeneratedAnimals] = useState<Animal[]>([]);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [itemsReady, setItemsReady] = useState(false);
    const [remainingAnimals, setRemainingAnimals] = useState(animals);
    const [feedbackKey, setFeedbackKey] = useState<string | null>(null);
    const [shouldGenerateItems, setShouldGenerateItems] = useState(false);
    const [initialItemsGenerated, setInitialItemsGenerated] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(true);
    const [showConfetti, setShowConfetti] = useState(false);
    const [points, setPoints] = useState(0);
    const [isLastAnimal, setIsLastAnimal] = useState(false);
    const [gameEnd, setGameEnd] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const translate = useTranslate();
    const { language } = useLanguage();
    const navigate = useNavigate();

    useEffect(() => {
        if (!initialItemsGenerated) {
            generateInitialItems();
            setInitialItemsGenerated(true);
        }
    }, [initialItemsGenerated]);

    useEffect(() => {
        if (shouldGenerateItems) {
            generateItems();
            setShouldGenerateItems(false);
        }
    }, [shouldGenerateItems]);

    useEffect(() => {
        updateAnimalNames();
    }, [language]);

    useEffect(() => {
        if (itemsReady) {
            startSpin();
        }
    }, [itemsReady]);

    const getAnimalName = (animal: Animal) => animal.name[language];

    const updateAnimalNames = () => {
        const items = document.querySelectorAll(".item-name") as NodeListOf<HTMLParagraphElement>;
        items.forEach((item, index) => {
            const animal = generatedAnimals[index];
            if (animal) {
                item.innerText = getAnimalName(animal);
            }
        });
    };

    const generateInitialItems = () => {
        const items = document.querySelector(".items") as HTMLDivElement;
        items.innerHTML = "";
        items.style.transition = "none";
        items.style.transform = "translateX(0)";

        const generatedList: Animal[] = [];

        for (let i = 0; i < 4; i++) {
            const item = document.createElement("div");
            item.className = "item";

            let randomAnimal: Animal | undefined;

            if (remainingAnimals.length > 2) {
                do {
                    const randomIndex = Math.floor(Math.random() * remainingAnimals.length);
                    randomAnimal = remainingAnimals[randomIndex];
                } while (generatedList.includes(randomAnimal));
            } else if (remainingAnimals.length > 0) {
                const randomIndex = Math.floor(Math.random() * remainingAnimals.length);
                randomAnimal = remainingAnimals[randomIndex];
            } else {
                console.error("No animals left to generate");
                return;
            }

            if (!randomAnimal) {
                console.error("Random animal is undefined");
                return;
            }

            const name = document.createElement("p");
            name.className = "item-name";
            name.innerText = getAnimalName(randomAnimal);
            item.appendChild(name);

            const imageKey = `${randomAnimal.image}`;
            const image = preloadedImages[imageKey];

            if (!image) {
                console.error(`Image not found for animal ${randomAnimal.name}`);
            } else {
                item.style.backgroundImage = `url(${image.src})`;
            }

            items.appendChild(item);
            generatedList.push(randomAnimal);
        }

        setGeneratedAnimals(generatedList);
    };

    const generateItems = () => {
        const items = document.querySelector(".items") as HTMLDivElement;
        items.innerHTML = "";
        items.style.transition = "none";
        items.style.transform = "translateX(0)";

        const generatedList: Animal[] = [];
        let lastAnimal: Animal | null = null;
        let secondLastAnimal: Animal | null = null;

        for (let i = 0; i < 50; i++) {
            const item = document.createElement("div");
            item.className = "item";

            let randomAnimal: Animal | undefined;

            if (remainingAnimals.length > 2) {
                do {
                    const randomIndex = Math.floor(Math.random() * remainingAnimals.length);
                    randomAnimal = remainingAnimals[randomIndex];
                } while (randomAnimal === lastAnimal || randomAnimal === secondLastAnimal);

                secondLastAnimal = lastAnimal;
                lastAnimal = randomAnimal;
            } else if (remainingAnimals.length > 0) {
                const randomIndex = Math.floor(Math.random() * remainingAnimals.length);
                randomAnimal = remainingAnimals[randomIndex];
            } else {
                console.error("No animals left to generate");
                return;
            }

            if (!randomAnimal) {
                console.error("Random animal is undefined");
                return;
            }

            const name = document.createElement("p");
            name.className = "item-name";
            name.innerText = getAnimalName(randomAnimal);
            item.appendChild(name);

            const imageKey = `${randomAnimal.image}`;
            const image = preloadedImages[imageKey];

            if (!image) {
                console.error(`Image not found for animal ${randomAnimal.name}`);
            } else {
                item.style.backgroundImage = `url(${image.src})`;
            }

            items.appendChild(item);
            generatedList.push(randomAnimal);
        }

        setGeneratedAnimals(generatedList);
        setItemsReady(true);
    };

    const startSpin = () => {
        if (!itemsReady) return;

        const items = document.querySelector(".items") as HTMLDivElement;
        const itemWrapper = document.querySelector(".item-wrapper") as HTMLDivElement;
        const itemWidth = items.querySelector(".item")!.clientWidth;
        const visibleWidth = itemWrapper.clientWidth;

        const itemsCount = items.children.length;
        const totalWidth = itemWidth * itemsCount;

        const stopIndex = itemsCount - 6 + Math.floor(Math.random() * 3);

        const centerBuffer = Math.floor(itemWidth * 0.25);
        const randomOffset = Math.floor(Math.random() * (itemWidth - centerBuffer * 2)) + centerBuffer;
        const finalTranslateTo = stopIndex * itemWidth - (visibleWidth / 2 - itemWidth / 2) + randomOffset;

        items.style.transition = "transform 5s ease-out";
        items.style.transform = `translateX(-${finalTranslateTo}px)`;

        setTimeout(() => {
            setIsRolling(false);

            const stopPosition = finalTranslateTo % totalWidth;
            const centerIndex = Math.floor((stopPosition + visibleWidth / 2 - itemWidth / 2) / itemWidth);
            const selectedAnimalIndex = centerIndex % generatedAnimals.length;
            const selectedAnimal = generatedAnimals[selectedAnimalIndex];

            setSelectedAnimal(selectedAnimal);

            setRemainingAnimals((prevRemainingAnimals) => {
                const newRemainingAnimals = prevRemainingAnimals.filter((animal) => animal.id !== selectedAnimal.id);
                if (newRemainingAnimals.length === 0) {
                    setIsLastAnimal(true);
                }
                return newRemainingAnimals;
            });

            const previousSelected = items.querySelector(".selected");
            if (previousSelected) {
                previousSelected.classList.remove("selected");
            }

            const selectedItem = items.children[centerIndex] as HTMLDivElement;
            selectedItem.classList.add("selected");

            setItemsReady(false);
            setHasAnswered(false);
        }, 5000);
    };

    const handleChoice = (isNational: boolean) => {
        if (!selectedAnimal) return;

        const isCorrectAnswer = isNational === selectedAnimal.isFinnishNational;
        const hasFact = selectedAnimal.fact && selectedAnimal.fact.en;

        if (isCorrectAnswer) {
            setFeedbackKey("spinner-correct");
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
            setPoints((prevPoints) => {
                const newPoints = prevPoints + 1;
                if (isLastAnimal) {
                    setGameEnd(true);
                    setTimeout(() => {
                        navigate("/end", { state: { points: newPoints } });
                    }, 5000);
                }
                return newPoints;
            });
            if (hasFact) {
                setIsModalOpen(true);
            }
        } else {
            setFeedbackKey(selectedAnimal.isFinnishNational ? "spinner-wrong-national" : "spinner-wrong-not-national");
            if (isLastAnimal) {
                setGameEnd(true);
                setTimeout(() => {
                    navigate("/end", { state: { points } });
                }, 5000);
            }
        }

        setHasAnswered(true);
    };

    const handleSpinClick = () => {
        setIsRolling(true);
        setFeedbackKey(null);
        setSelectedAnimal(null);
        generateItems();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="spinner-container">
            <span className="points">{translate("spinner-points")}: {points}</span>
            <div className="item-wrapper">
                <div className="items"></div>
            </div>
            <button className="spin-button" onClick={handleSpinClick} disabled={isRolling || !hasAnswered || gameEnd}>
                {isRolling ? translate("spinner-button-spinning") : translate("spinner-button-spin")}
            </button>

            {isModalOpen && selectedAnimal && (
                <AnimalFactModal
                    animal={selectedAnimal}
                    preloadedImages={preloadedImages}
                    onClose={() => handleCloseModal()}
                />
            )}

            {selectedAnimal && (
                <div>
                    <p className="selected-animal">{translate("spinner-you-got")}: {getAnimalName(selectedAnimal)}</p>
                    <p className="question">{translate("spinner-question")}</p>
                    <button className="answer-button" onClick={() => handleChoice(true)} disabled={hasAnswered}>{translate("spinner-yes")}</button>
                    <button className="answer-button" onClick={() => handleChoice(false)} disabled={hasAnswered}>{translate("spinner-no")}</button>
                </div>
            )}

            {feedbackKey && <p className="feedback-message">{translate(feedbackKey)}</p>}

            <ConfettiComponent showConfetti={showConfetti} />
        </div>
    );
};

export default Spinner;