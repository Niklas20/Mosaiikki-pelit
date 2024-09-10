import { useNavigate } from "react-router-dom";
import "./PregameScreen.css";
import { useTranslate } from "../../utils/translate";

const PregameScreen = () => {
    const navigate = useNavigate();
    const translate = useTranslate();

    // Function to handle button click and pass the spinner type
    const handleButtonClick = (spinnerType: number) => {
        navigate("/game", { state: { spinnerType } });
    }

    return (
        <div className="screen pregame-screen">
            <div className="pregame-screen-container">

                <button
                    className="pregame-screen-button1"
                    onClick={() => handleButtonClick(1)}
                >
                    {translate("pregame-screen-button1")}
                </button>

                <button
                    className="pregame-screen-button2"
                    onClick={() => handleButtonClick(2)}
                >
                    {translate("pregame-screen-button2")}
                </button>

                <button
                    className="pregame-screen-button3"
                    onClick={() => handleButtonClick(3)}
                >
                    {translate("pregame-screen-button3")}
                </button>

                <button
                    className="pregame-screen-button4"
                    onClick={() => handleButtonClick(4)}
                >
                    {translate("pregame-screen-button4")}
                </button>

            </div>
        </div>
    );
}

export default PregameScreen;