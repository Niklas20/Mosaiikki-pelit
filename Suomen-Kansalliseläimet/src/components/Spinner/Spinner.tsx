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

            let randomAnimal: Animal;

            do {
                const randomIndex = Math.floor(Math.random() * animals.length);
                randomAnimal = animals[randomIndex];
            } while (randomAnimal === lastAnimal || randomAnimal === secondLastAnimal);

            secondLastAnimal = lastAnimal;
            lastAnimal = randomAnimal;

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

            const previousSelected = items.querySelector(".selected");
            if (previousSelected) {
                previousSelected.classList.remove("selected");
            }

            const selectedItem = items.children[centerIndex] as HTMLDivElement;
            selectedItem.classList.add("selected");

            console.log("All items", generatedAnimals);


            setItemsReady(false);
        }, 5000);
    };

    const handleSpinClick = () => {
        setIsRolling(true);
        generateItems();
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
            {selectedAnimal && <p>You got: {selectedAnimal.name}!</p>}
        </div>
    );
};

export default Spinner;
