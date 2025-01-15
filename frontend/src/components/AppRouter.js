import Home from "../pages/Home";
import Menu from "../pages/Menu";
import Login from "../pages/Login";
import Register from "../pages/Register";
import React, {useEffect, useState} from "react";
import AdminLogin from "../pages/AdminLogin";
import OrderSummary from "../pages/OrderSummary";
import PromotionsPage from "../pages/PromotionsPage";
import OrderDetails from "../pages/OrderDetails";
import MainAdminMenu from "../pages/MainAdminMenu";
import RestaurantPanel from "../pages/RestaurantPanel";
import axios from "axios";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UserDashboard from "../pages/UserDashboard";

const checkToken =  async (username, token) => {
    const response = await fetch(`http://localhost:8080/admin/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({username, token}),
    })

    return response.status;

}

const isAuthenticated = async (username, token) => {
    const status = await checkToken(username, token);
    console.log('status', status);
    return status === 200;
}

const isLoggedIn = () =>{
    console.log("zalogowany? -> ", localStorage.getItem('userId'))
    return !!localStorage.getItem('userId');
}

const AppRouter = () => {
    const [authenticated, setAuthenticated] = useState(null); // stan dla autentyczności
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");


        if (username && token) {
            isAuthenticated(username, token).then((authStatus) => {
                setAuthenticated(authStatus);
            });
        } else {
            setAuthenticated(false); // Brak tokenu lub username oznacza brak autentyczności
        }


    }, [localStorage.getItem('token')]); // uruchom raz przy renderowaniu komponentu

    if (authenticated === null) {
        return <div>Loading...</div>;
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
            index: true,
        },
        {
            path: "/menu",
            element: <Menu />,
            index: true,
        },
        {
            path: "/register",
            element: <Register />,
            index: true,
        },
        {
            path: "/login",
            element: <Login />,
            index: true,
        },
        {
            path: "/admin",
            element: <AdminLogin />,
            index: true,
        },
        {
            path: "/promotions",
            element: <PromotionsPage />,
            index: true,
        },
        {
            path: "/zamowienie/:orderId",
            element: <OrderDetails />,
        },
        {
            path: "/userdashboard",
            element: <UserDashboard />,
        },
        {
            element: <ProtectedRoute isAuthenticated={isLoggedIn} redirectPath='/login' />,
            children:[
                {
                    path: "/ordersummary",
                    element: <OrderSummary />,
                }
            ]
        },
        {
            element: <ProtectedRoute isAuthenticated={authenticated} redirectPath='/admin'/>, // Przekazywanie statusu autentyczności
            children: [
                {
                    path: "/admin/settings",
                    element: <MainAdminMenu />,
                },
                {
                    path: "/admin/restaurant/:restaurantId",
                    element: <RestaurantPanel />,
                },
            ],
        },
        {
            path: "*",
            element: <p>404 Error - Nothing here...</p>,
        },
    ]);

    return <RouterProvider router={router}/>;
};

export default AppRouter;
