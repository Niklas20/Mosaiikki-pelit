import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainScreen from "./pages/MainScreen/MainScreen";
import EndScreen from "./pages/EndScreen/EndScreen";
import GameScreen from "./pages/GameScreen/GameScreen";
import InfoScreen from "./pages/InfoScreen/InfoScreen";
import PregameScreen from "./pages/PreGameScreen/PregameScreen";
import MotiveScreen from "./pages/MotiveScreen/MotiveScreen";
import { useEffect, useState } from "react";
import LoadingScreen from "./pages/LoadingScreen/LoadingScreen";
import { preloadImages } from "./utils/preloadImages";

const Router = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [percentageLoaded, setPercentageLoaded] = useState<number>(0);
    const [preloadedImages, setPreloadedImages] = useState<Record<string, HTMLImageElement>>({});

    useEffect(() => {
        const assetImages = import.meta.glob("/src/imgs/assets/*", { eager: true });
        const buttonImages = import.meta.glob("/src/imgs/buttons/*", { eager: true });
        const gameImages = import.meta.glob("/src/imgs/game/*", { eager: true });

        const imageMap: Record<string, string> = {};

        Object.entries(gameImages).forEach(([path, image]) => {
            const filename = path.split("/").pop();
            imageMap[filename as string] = (image as any).default as string;
        });

        Object.entries(assetImages).forEach(([path, image]) => {
            const filename = path.split("/").pop();
            imageMap[filename as string] = (image as any).default as string;
        });

        Object.entries(buttonImages).forEach(([path, image]) => {
            const filename = path.split("/").pop();
            imageMap[filename as string] = (image as any).default as string;
        });

        const imageUrls = Object.values(imageMap);

        console.log("Preloading images:", imageUrls);

        preloadImages(imageUrls, (percentage) => {
            setPercentageLoaded(percentage);
        })
            .then((images) => {
                const preloadedImagesWithKeys: Record<string, HTMLImageElement> = {};
                Object.keys(imageMap).forEach((fileName) => {
                    preloadedImagesWithKeys[fileName] = images[imageMap[fileName]];
                });

                setPreloadedImages(preloadedImagesWithKeys);
                setLoading(false);
            })
            .catch((error: Error) => {
                console.error("Error preloading images:", error);
            });
    }, []);

    if (loading) {
        return <LoadingScreen percentageLoaded={percentageLoaded} />
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/', element: <MainScreen /> },
                { path: '/end', element: <EndScreen /> },
                { path: '/pregame', element: <PregameScreen /> },
                { path: '/game', element: <GameScreen preloadedImages={preloadedImages} /> },
                { path: '/info', element: <InfoScreen /> },
                { path: '/motive', element: <MotiveScreen /> }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default Router;