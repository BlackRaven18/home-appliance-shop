import { createBrowserRouter } from "react-router-dom";
import AdminHome from '../view/AdminHome/AdminHome';
import AdminLogin from '../view/AdminLogin';
import History from '../view/History';
import Home from '../view/Home/Home';
import ProductDetails from "../view/ProductDetails/ProductDetails";
import AdminProfil from '../view/Profil/AdminProfil';
import Profil from '../view/Profil/Profil';
import Register from '../view/Register/Register';
import Summary from "../view/Summary/Summary";
import Login from './../view/Login';
import ShoppingCart from './../view/ShoppingCart/ShoppingCart';
import ProtectedElement from "./ProtectedElement";
import LoginHome from "../view/Home/LoginHome";
import NotFoundView from "../view/NotFoundView";

/*
    <ProtectedElement> checks conditions and pass the user or not
    element - component to which user is trying to get access
    redirectPath - path to redirect when user is not allowed to go to specific path
    allowLoggedInUser - e.g. when user is logged-in we don't wan't him to go to /login page
                        because he's logged in already
*/
const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedElement
            element={<Home />}
            redirectPath="/loginhome"
            allowLoggedInUser={false} />
        //<Home />,
    },
    {
        path: "*",
        element: <NotFoundView />
    },
    {
        path: "/login",
        element: <ProtectedElement
            element={<Login />}
            redirectPath="/loginhome"
            allowLoggedInUser={false} />
    },
    {
        path: "/register",
        element: <ProtectedElement
            element={<Register />}
            redirectPath="/loginhome"
            allowLoggedInUser={false} />
    },
    {
        path: "/home",
        element: <ProtectedElement
            element={<Home />}
            redirectPath="/loginhome"
            allowLoggedInUser={false} />
    },
    {
        path: "/productdetails",
        element: <ProductDetails />,
    },
    {
        path: "/loginhome",
        element: <ProtectedElement
            element={<LoginHome />}
            redirectPath="/login"
            allowLoggedInUser={true} />
    },
    {
        path: "/adminhome",
        element: <ProtectedElement
            element={<AdminHome />}
            redirectPath="/adminlogin"
            allowLoggedInUser={true} />
    },
    {
        path: "/adminlogin",
        element: <AdminLogin />,
    },
    {
        path: "/shoppingcart",
        element: <ProtectedElement
            element={<ShoppingCart />}
            redirectPath="/login"
            allowLoggedInUser={true} />
    },
    {
        path: "/summary",
        element: <ProtectedElement
            element={<Summary />}
            redirectPath="/login"
            allowLoggedInUser={true} />
    },
    {
        path: "/history",
        element: <ProtectedElement
            element={<History />}
            redirectPath="/login"
            allowLoggedInUser={true} />
    },
    {
        path: "/profil",
        element: <ProtectedElement
            element={<Profil />}
            redirectPath="/login"
            allowLoggedInUser={true} />
    },
    {
        path: "/adminprofil",
        element: <ProtectedElement
            element={<AdminProfil />}
            redirectPath="/adminlogin"
            allowLoggedInUser={true} />
    },

]);


export default router;
