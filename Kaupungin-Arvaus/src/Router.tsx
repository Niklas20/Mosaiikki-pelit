import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainMenu from "./pages/MainScreen/MainScreen";
import InfoScreen from "./pages/InfoScreen/InfoScreen";
import GameScreen from "./pages/GameScreen/GameScreen";
import EndScreen from "./pages/EndScreen/EndScreen";
import Layout from "./components/common/Layout.tsx";
import MotiveScreen from "./pages/MotiveScreen/MotiveScreen.tsx";
import { preloadImages } from "./Utils/imagePreloader.ts";
import { useEffect, useState } from "react";
import LoadingScreen from "./pages/LoadingScreen/LoadingScreen.tsx";

/**
 * Router component
 * 
 * @returns {JSX.Element} Router component
 */
function Router() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [preloadedImages, setPreloadedImages] = useState<Record<string, HTMLImageElement>>({});

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        // Pass onProgress function to update the progress state
        preloadImages({
            onProgress: (progressValue) => {
                setProgress(progressValue);  // Update progress state
            }
        })
            .then((images) => {
                const imagesMap: Record<string, HTMLImageElement> = {};
                Object.keys(images).forEach((key, index) => {
                    imagesMap[key] = images[index];
                });
                setPreloadedImages(imagesMap);

                timeoutId = setTimeout(() => {
                    setLoading(false);  // Hide loading screen after 1 second
                }, 1000);
            })
            .catch((error: Error) => {
                console.error('Error preloading images:', error);
                setLoading(false);
            });

        return () => { clearTimeout(timeoutId); }
    }, []);

    if (loading) {
        return <LoadingScreen percentageLoaded={progress} />;
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/', element: <MainMenu /> },
                { path: '/info', element: <InfoScreen /> },
                { path: '/game', element: <GameScreen preloadedImages={preloadedImages} /> },
                { path: '/end', element: <EndScreen /> },
                { path: '/motive', element: <MotiveScreen /> },
                { path: '*', element: <MainMenu /> }
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default Router;