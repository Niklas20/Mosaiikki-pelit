import React from "react";
import { Animal } from "../../utils/types";
import Spinner from "../../components/Spinner/Spinner";

const animals: Animal[] = [
    { id: 1, name: "Karhu", image: "karhu.jpg", isFinnishNational: true },
    { id: 2, name: "Hirvi", image: "hirvi.jpg", isFinnishNational: false },
    { id: 3, name: "Susi", image: "susi.jpg", isFinnishNational: false },
    { id: 4, name: "Ilves", image: "ilves.jpg", isFinnishNational: false },
    { id: 5, name: "Ahma", image: "ahma.jpg", isFinnishNational: false },
];

const GameScreen: React.FC = () => {
    return (
        <div className="screen">
            <Spinner animals={animals} />
        </div>
    );
};

export default GameScreen;
