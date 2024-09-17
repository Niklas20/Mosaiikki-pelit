import { useState } from "react";
import { Animal } from "../../utils/types";
import "./Spinner.css";

interface SpinnerProps {
    animals: Animal[];
}

const Spinner = ({ animals }: SpinnerProps) => {
    const [isRolling, setIsRolling] = useState<boolean>(false);

    const generateItems = () => {
        const items = document.querySelector(".items") as HTMLDivElement;
        items.innerHTML = "";
        items.style.transition = "none";
        items.style.transform = "translateX(0)";

        for (let i = 0; i < 50; i++) {
            const item = document.createElement("div");
            item.className = "item";

            const randomIndex = Math.floor(Math.random() * animals.length);
            const randomAnimal = animals[randomIndex];
            const name = document.createElement("p");
            name.className = "item-name";
            name.innerText = randomAnimal.name;

            item.appendChild(name);
            items.appendChild(item);
        }
    };

    const startSpin = () => {
        setIsRolling(true);
        generateItems();

        const items = document.querySelector(".items") as HTMLDivElement;
        const itemWrapper = document.querySelector(".item-wrapper") as HTMLDivElement;
        const itemWidth = items.querySelector(".item")!.clientWidth;
        const visibleWidth = itemWrapper.clientWidth;

        const itemsCount = items.children.length;
        const thirdLastIndex = itemsCount - 3;
        const baseTranslateTo = itemWidth * thirdLastIndex - (visibleWidth / 2 - itemWidth / 2);

        const randomOffset = Math.floor(Math.random() * 100) - 50;

        const finalTranslateTo = baseTranslateTo + randomOffset;

        items.style.transition = "transform 5s ease-out";
        items.style.transform = `translateX(-${finalTranslateTo}px)`;

        setTimeout(() => {
            setIsRolling(false);
        }, 5000);
    };

    return (
        <div className="spinner-container">
            <div className="item-wrapper">
                <div className="items">

                </div>
            </div>
            <button className="spin-button" onClick={startSpin} disabled={isRolling}>
                {isRolling ? "Spinning..." : "Spin"}
            </button>
        </div>
    );
};

export default Spinner;
