import { useState, useEffect } from "react";
import { Animal } from "../../utils/types";
import "./Spinner.css";

interface SpinnerProps {
    animals: Animal[];
}

const Spinner = ({ animals }: SpinnerProps) => {
    const [isRolling, setIsRolling] = useState<boolean>(false);
    const [generatedAnimals, setGeneratedAnimals] = useState<Animal[]>([]);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const [itemsReady, setItemsReady] = useState<boolean>(false);
    const [remainingAnimals, setRemainingAnimals] = useState<Animal[]>(animals);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [shouldGenerateItems, setShouldGenerateItems] = useState<boolean>(false);

    useEffect(() => {
        if (shouldGenerateItems) {
            generateItems();
            setShouldGenerateItems(false);
        }
    }, [shouldGenerateItems]);

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
            name.innerText = randomAnimal.name;
            item.appendChild(name);

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

            setRemainingAnimals((prevRemainingAnimals) =>
                prevRemainingAnimals.filter((animal) => animal.id !== selectedAnimal.id)
            );

            const previousSelected = items.querySelector(".selected");
            if (previousSelected) {
                previousSelected.classList.remove("selected");
            }

            const selectedItem = items.children[centerIndex] as HTMLDivElement;
            selectedItem.classList.add("selected");

            setItemsReady(false);
        }, 5000);
    };

    const handleChoice = (isNational: boolean) => {
        if (!selectedAnimal) return;

        if (isNational === selectedAnimal.isFinnishNational) {
            setFeedback("Correct!");
        } else {
            setFeedback("Wrong! This animal is " + (selectedAnimal.isFinnishNational ? "a Finnish national animal" : "not a Finnish national animal"));
        }
    }

    const handleSpinClick = () => {
        if (remainingAnimals.length === 0) {
            setRemainingAnimals(animals);
            setIsRolling(true);
            setFeedback(null);
            setSelectedAnimal(null);
            setShouldGenerateItems(true);
        } else {
            setIsRolling(true);
            setFeedback(null);
            setSelectedAnimal(null);
            generateItems();
        }
    };

    return (
        <div className="spinner-container">
            <div className="item-wrapper">
                <div className="items">

                </div>
            </div>
            <button className="spin-button" onClick={handleSpinClick} disabled={isRolling}>
                {isRolling ? "Spinning..." : "Spin"}
            </button>

            {selectedAnimal && (
                <div>
                    <p>You got: {selectedAnimal.name}</p>
                    <p>Is this animal a national animal?</p>
                    <button onClick={() => handleChoice(true)}>Yes</button>
                    <button onClick={() => handleChoice(false)}>No</button>
                </div>
            )}

            {feedback && <p>{feedback}</p>}
        </div>
    );
};

export default Spinner;