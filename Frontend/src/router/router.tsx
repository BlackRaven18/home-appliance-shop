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


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "*",
        element: <NotFoundView/>
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
        element: <ProtectedElement element={<LoginHome/>} redirectPath="/login" />
    },
    {
        path: "/adminhome",
        element: <ProtectedElement element={<AdminHome/>} redirectPath="/adminlogin" /> 
    },
    {
        path: "/adminlogin",
        element: <AdminLogin />,
    },
    {
        path: "/shoppingcart",
        element: <ProtectedElement element={<ShoppingCart/>} redirectPath="/login" />
    },
    {
        path: "/summary",
        element: <ProtectedElement element={<Summary/>} redirectPath="/login" /> 
    },
    {
        path: "/history",
        element: <ProtectedElement element={<History/>} redirectPath="/login" />
    },
    {
        path: "/profil",
        element: <ProtectedElement element={<Profil/>} redirectPath="/login" /> 
    },
    {
        path: "/adminprofil",
        element: <ProtectedElement element={<AdminProfil/>} redirectPath="/adminlogin" /> 
    },
    
]);


export default router;
