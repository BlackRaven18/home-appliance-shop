import React from "react";
import Login from './../view/Login';
import Register from './../view/Register';
import Home from '../view/Home/Home';
import LoginHome from '../view/Home/LoginHome';
import AdminLogin from '../view/AdminLogin';
import AdminHome from '../view/AdminHome/AdminHome';
import ShoppingCart from './../view/ShoppingCart/ShoppingCart';
import History from '../view/History';
import Profil from '../view/Profil/Profil';
import Summary from "../view/Summary/Summary";
import AdminProfil from '../view/Profil/AdminProfil';
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
        element: <LoginHome />,
    },
    {
        path: "/adminhome",
        element: <AdminHome />,
    },
    {
        path: "/adminlogin",
        element: <AdminLogin />,
    },
    {
        path: "/adminlogin",
        element: <AdminLogin />,
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
        element: <AdminProfil />,
    },
]);

export default router;
