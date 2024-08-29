import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MainScreen from "./pages/MainScreen/MainScreen";

const Router = () => {

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Layout />,
            children: [
                { path: '/', element: <MainScreen /> },
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default Router;