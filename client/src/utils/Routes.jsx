import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Available from "../pages/Available";
import OwnerLands from "../pages/OwnerLands"
import Land from "../pages/Land"
import React from "react";
import ErrorPage from "../components/ErrorPage";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage error='-1' />,
    },
    {
        path: "/available",
        element: <Available />,
        errorElement: <ErrorPage error='-1' />,
    },
    {
        path: "/owner/:address",
        element: <OwnerLands />,
    },
    {
        path: "/land/:address",
        element: <Land />,
        errorElement: <ErrorPage error='-1' />,
    },
]);

export default routes;