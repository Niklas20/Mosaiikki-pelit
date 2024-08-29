import Router from "./Router"
import "./App.css"
import { LanguageProvider } from "./contexts/LanguageProvider"
import { GameOverProvider } from "./contexts/GameOverContext"
import { GameProvider } from "./contexts/GameContext"

/**
 * Application component
 * 
 * @returns {JSX.Element} Application component
 */
const App = () => {
  return (
    <LanguageProvider>
      <GameProvider>
        <GameOverProvider>
          <div className="container">
            <Router />
          </div>
        </GameOverProvider>
      </GameProvider>
    </LanguageProvider>
  )
}

export default App
