import React, { createContext, useContext, useState } from "react";

/**
 * Game over context properties
 */
interface GameOverContextProps {
    isGameOver: boolean;
    endGame: () => void;
    resetGameState: () => void;
}

// Create game over context
const GameOverContext = createContext<GameOverContextProps | undefined>(undefined);

/**
 * Game over context provider
 * 
 * @param {React.ReactNode} props.children - Child elements
 * @returns {JSX.Element} Game over context provider
 */
export const GameOverProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isGameOver, setIsGameOver] = useState<boolean>(false);

    const endGame = () => setIsGameOver(true);
    const resetGameState = () => setIsGameOver(false);

    return (
        <GameOverContext.Provider value={{ isGameOver, endGame, resetGameState }}>
            {children}
        </GameOverContext.Provider>
    );
}

/**
 * useGameOver hook
 * 
 * @returns {GameOverContextProps} Game over context properties
 */
export const useGameOver = () => {
    const context = useContext(GameOverContext);
    if (!context) {
        throw new Error("useGameOver must be used within a GameOverProvider");
    }

    return context;
}