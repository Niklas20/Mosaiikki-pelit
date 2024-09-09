import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainScreen from "./pages/MainScreen/MainScreen";
import EndScreen from "./pages/EndScreen/EndScreen";
import GameScreen from "./pages/GameScreen/GameScreen";
import InfoScreen from "./pages/InfoScreen/InfoScreen";
import PregameScreen from "./pages/PreGameScreen/PregameScreen";

const Router = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/', element: <MainScreen /> },
                { path: '/end', element: <EndScreen /> },
                { path: '/pregame', element: <PregameScreen /> },
                { path: '/game', element: <GameScreen /> },
                { path: '/info', element: <InfoScreen /> }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default Router;