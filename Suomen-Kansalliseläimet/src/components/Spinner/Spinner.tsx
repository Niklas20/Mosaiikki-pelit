import { useEffect, useRef, useState } from "react";
import { Animal } from "../../utils/types";
import "./Spinner.css";

interface SpinnerProps {
    animals: Animal[];
}

const Spinner = ({ animals }: SpinnerProps) => {
    const [isSpinning, setIsSpinning] = useState(false);
    const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
    const reelRef = useRef<HTMLDivElement>(null);
    const itemWidth = 150;
    const duration = 3000;

    useEffect(() => {
        if (isSpinning && reelRef.current) {
            const totalItems = animals.length;
            const duplicatedItems = [...animals, ...animals, ...animals];
            const totalWidth = itemWidth * duplicatedItems.length;
            const randomIndex = Math.floor(Math.random() * totalItems);
            const randomOffset = Math.floor(Math.random() * itemWidth);
            const finalPosition = randomIndex * itemWidth + totalWidth / 2 + randomOffset;

            reelRef.current.style.transition = `transform ${duration}ms cubic-bezier(0.33, 1, 0.68, 1)`;
            reelRef.current.style.transform = `translateX(-${finalPosition}px)`;

            const stopPosition = finalPosition % (totalItems * itemWidth);

            setTimeout(() => {
                setIsSpinning(false);

                reelRef.current!.style.transition = 'none';
                reelRef.current!.style.transform = `translateX(-${stopPosition}px)`;
                reelRef.current?.offsetHeight;
                reelRef.current!.style.transition = '';
                const indicatorPosition = itemWidth / 2;
                const index = Math.floor((stopPosition + indicatorPosition) / itemWidth) % totalItems;
                setSelectedAnimal(animals[index]);
            }, duration);
        }
    }, [isSpinning, animals]);

    const startSpin = () => {
        if (!isSpinning) {
            setIsSpinning(true);
            setSelectedAnimal(null);
        }
    };

    return (
        <div className="spinner-container">
            <div className="item-wrapper">
                <div className="items" ref={reelRef}>
                    {[...animals, ...animals, ...animals].map((animal, index) => (
                        <div key={index} className="item">
                            <img src={animal.image} alt={animal.name} />
                        </div>
                    ))}
                </div>
                <div className="indicator" />
            </div>
            <button className="start-spin-button" onClick={startSpin} disabled={isSpinning}>
                {isSpinning ? "Spinning..." : "Spin"}
            </button>
            {selectedAnimal && (
                <div className="result">
                    <h2>You got: {selectedAnimal.name}</h2>
                    <img src={selectedAnimal.image} alt={selectedAnimal.name} />
                </div>
            )}
        </div>
    );
};

export default Spinner;
