import Router from "./Router"
import './App.css'
import { LanguageProvider } from "./contexts/LanguageProvider"

const App = () => {
    return (
        <LanguageProvider>
            <div className="container">
                <Router />
            </div>
        </LanguageProvider>
    )
}

export default App