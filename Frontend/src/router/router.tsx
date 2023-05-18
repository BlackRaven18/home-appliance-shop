import React from "react";
import Login from './../view/Login';
import Register from './../view/Register';
import Home from '../view/Home/Home';
import Loginhome from '../view/Home/Loginhome';
import Adminlogin from './../view/Adminlogin';
import Adminhome from './../view/Adminhome/Adminhome';
import ShoppingCart from './../view/ShoppingCart/ShoppingCart';
import History from '../view/History';
import Profil from '../view/Profil/Profil';
import Adminprofil from '../view/Profil/Adminprofil';
import Summary from "../view/ShoppingCart/Summary";
import {
    createBrowserRouter,
} from "react-router-dom";
import ProductDetails from "../view/ProductDetails/ProductDetails";

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
        path: "/productdetails",
        element: <ProductDetails />,
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
        path: "/shoppingcart",
        element: <ShoppingCart />,
    },
    {
        path: "/summary",
        element: <Summary />,
    },
    {
        path: "/history",
        element: <History />,
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
