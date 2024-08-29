import { City, Hint } from "@/Utils/types";
import React, { createContext, ReactNode, useState } from "react";

/**
 * Game context properties
 */
interface GameContextProps {
    city: City | null;
    setCity: (city: City | null) => void;
    revealedLetters: string[];
    setRevealedLetters: (revealedLetters: string[]) => void;
    hintIndex: number;
    setHintIndex: (hintIndex: number) => void;
    points: number;
    setPoints: React.Dispatch<React.SetStateAction<number>>;
    timeElapsed: number;
    setTimeElapsed: React.Dispatch<React.SetStateAction<number>>;
    hintsUsed: number;
    setHintsUsed: React.Dispatch<React.SetStateAction<number>>;
    hints: Hint[];
    addHint: (newHint: Hint) => void;
    resetGame: () => void;
}

const GameContext = createContext<GameContextProps | undefined>(undefined);

/**
 * Game context provider
 * 
 * @param {React.ReactNode} props.children - Child elements
 * @returns {JSX.Element} Game context provider
 */
export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [city, setCity] = useState<City | null>(null);
    const [revealedLetters, setRevealedLetters] = useState<string[]>([]);
    const [hintIndex, setHintIndex] = useState<number>(0);
    const [points, setPoints] = useState<number>(1000);
    const [timeElapsed, setTimeElapsed] = useState<number>(0);
    const [hintsUsed, setHintsUsed] = useState<number>(0);
    const [hints, setHints] = useState<Hint[]>([]);

    const addHint = (newHint: Hint) => {
        setHints(prevHints => [...prevHints, newHint]);
    }

    const resetGame = () => {
        setCity(null);
        setRevealedLetters([]);
        setHintIndex(0);
        setPoints(1000);
        setTimeElapsed(0);
        setHintsUsed(0);
        setHints([]);
    };

    return (
        <GameContext.Provider value={{
            city, setCity,
            revealedLetters, setRevealedLetters,
            hintIndex, setHintIndex,
            points, setPoints,
            timeElapsed, setTimeElapsed,
            hintsUsed, setHintsUsed,
            hints, addHint,
            resetGame
        }}>
            {children}
        </GameContext.Provider>
    )
}

/**
 * useGame hook
 * 
 * @returns {GameContextProps} Game context properties
 */
export const useGame = () => {
    const context = React.useContext(GameContext);
    if (!context) {
        throw new Error("useGame must be used within a GameProvider");
    }

    return context;
}