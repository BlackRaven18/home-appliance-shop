import React from "react";
import Login from './../view/Login';
import Register from './../view/Register';
import Home from './../view/Home';
import Loginhome from './../view/Loginhome';
import Adminlogin from './../view/Adminlogin';
import Adminhome from './../view/Adminhome';
import Product from './../view/Product';
import Koszyk from '../view/ShoppingCart/ShoppingCart';
import Historia from './../view/Historia';
import Profil from './../view/Profil';
import Adminprofil from './../view/Adminprofil';
import {
    createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/loginhome",
        element: <Loginhome />,
    },
    {
        path: "/adminhome",
        element: <Adminhome />,
    },
    {
        path: "/adminlogin",
        element: <Adminlogin />,
    },
    {
            path: "/adminlogin",
            element: <Adminlogin />,
    },
    {
            path: "/product",
            element: <Product />,
    },
    {
            path: "/koszyk",
            element: <Koszyk />,
    },
    {
            path: "/historia",
            element: <Historia />,
    },
    {
            path: "/profil",
            element: <Profil />,
    },
    {
            path: "/adminprofil",
            element: <Adminprofil />,
    },
]);

export default router;
