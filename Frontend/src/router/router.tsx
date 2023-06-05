import {
    createBrowserRouter,
} from "react-router-dom";
import AdminHome from '../view/AdminHome/AdminHome';
import AdminLogin from '../view/AdminLogin';
import History from '../view/History';
import Home from '../view/Home/Home';
import LoginHome from '../view/Home/LoginHome';
import ProductDetails from "../view/ProductDetails/ProductDetails";
import AdminProfil from '../view/Profil/AdminProfil';
import Profil from '../view/Profil/Profil';
import Register from '../view/Register/Register';
import Summary from "../view/Summary/Summary";
import Login from './../view/Login';
import ShoppingCart from './../view/ShoppingCart/ShoppingCart';

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
