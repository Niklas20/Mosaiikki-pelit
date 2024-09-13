import { useState } from "react";
import { Animal } from "../../utils/types";
import "./Spinner.css";

interface SpinnerProps {
    animals: Animal[];
}

const Spinner = ({ animals }: SpinnerProps) => {
    const [isRolling, setIsRolling] = useState(false);

    const startSpin = () => {
        setIsRolling(true);
        setTimeout(() => {
            setIsRolling(false);
        }, 2000);
    };

    return (
        <div className="spinner-container">
            <div className="items">

            </div>
            <button className="spin-button" onClick={startSpin} disabled={isRolling}>{isRolling ? "Spinning..." : "Spin"}</button>
        </div>
    );
};

export default Spinner;
