import { useState, useEffect } from "react";
import { Animal } from "../../utils/types";
import "./Spinner.css";
import { useTranslate } from "../../utils/translate";
import { useLanguage } from "../../contexts/LanguageProvider";
import ConfettiComponent from "../../components/Confetti/Confetti";
import { useNavigate } from "react-router-dom";

interface SpinnerProps {
    animals: Animal[];
    preloadedImages: Record<string, HTMLImageElement>;
}

const Spinner = (props: SpinnerProps) => {
    const { animals, preloadedImages } = props;

    const [isRolling, setIsRolling] = useState<boolean>(false);
    const [generatedAnimals, setGeneratedAnimals] = useState<Animal[]>([]);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [itemsReady, setItemsReady] = useState<boolean>(false);
    const [remainingAnimals, setRemainingAnimals] = useState<Animal[]>(animals);
    const [feedbackKey, setFeedbackKey] = useState<string | null>(null);
    const [shouldGenerateItems, setShouldGenerateItems] = useState<boolean>(false);
    const [initialItemsGenerated, setInitialItemsGenerated] = useState<boolean>(false);
    const [hasAnswered, setHasAnswered] = useState<boolean>(true);
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const [points, setPoints] = useState<number>(0);
    const [isLastAnimal, setIsLastAnimal] = useState<boolean>(false);
    const [gameEnd, setGameEnd] = useState<boolean>(false);

    const translate = useTranslate();
    const { language } = useLanguage();
    const navigate = useNavigate();

    const feedback = feedbackKey ? translate(feedbackKey) : null;

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

    const getAnimalName = (animal: Animal) => {
        return animal.name[language];
    };

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

            const imageKey = `/src/imgs/game/${randomAnimal.image}`;
            const image = preloadedImages[imageKey];
            item.style.backgroundImage = `url(${image.src})`;

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

            const imageKey = `/src/imgs/game/${randomAnimal.image}`;
            const image = preloadedImages[imageKey];
            item.style.backgroundImage = `url(${image.src})`;

            items.appendChild(item);
            generatedList.push(randomAnimal);
        }

        setGeneratedAnimals(generatedList);
        setItemsReady(true);
    };

    useEffect(() => {
        if (itemsReady) {
            startSpin();
        }
    }, [itemsReady]);

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

        if (isNational === selectedAnimal.isFinnishNational) {
            setFeedbackKey(translate("spinner-correct"));
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
            setPoints((prevPoints) => {
                const newPoinst = prevPoints + 1;
                if (isLastAnimal) {
                    setGameEnd(true);
                    setTimeout(() => {
                        navigate("/end", { state: { points: newPoinst } });
                    }, 5000);
                }
                return newPoinst;
            })
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
    }

    const handleSpinClick = () => {
        setIsRolling(true);
        setFeedbackKey(null);
        setSelectedAnimal(null);
        generateItems();
    };

    return (
        <div className="spinner-container">
            <span className="points">{translate("spinner-points")}: {points}</span>
            <div className="item-wrapper">
                <div className="items">

                </div>
            </div>
            <button className="spin-button" onClick={handleSpinClick} disabled={isRolling || !hasAnswered || gameEnd}>
                {isRolling ? translate("spinner-button-spinning") : translate("spinner-button-spin")}
            </button>

            {selectedAnimal && (
                <div>
                    <p className="selected-animal">{translate("spinner-you-got")}: {getAnimalName(selectedAnimal)}</p>
                    <p className="question">{translate("spinner-question")}</p>
                    <button className="answer-button" onClick={() => handleChoice(true)} disabled={hasAnswered}>{translate("spinner-yes")}</button>
                    <button className="answer-button" onClick={() => handleChoice(false)} disabled={hasAnswered}>{translate("spinner-no")}</button>
                </div>
            )}

            {feedback && <p className="feedback-message">{feedback}</p>}

            <ConfettiComponent showConfetti={showConfetti} />
        </div>
    );
};

export default Spinner;