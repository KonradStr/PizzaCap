import Home from "./Home";
import Menu from "./Menu";
import Login from "./Login";
import Register from "./Register";
import React, {useEffect, useState} from "react";
import AdminLogin from "./AdminLogin";
import OrderSummary from "./OrderSummary";
import PromotionsPage from "./PromotionsPage";
import OrderDetails from "./OrderDetails";
import MainAdminMenu from "./MainAdminMenu";
import RestaurantPanel from "./RestaurantPanel";
import axios from "axios";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

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

const AppRouter = () => {
    const [authenticated, setAuthenticated] = useState(null); // stan dla autentyczności

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
    }, []); // uruchom raz przy renderowaniu komponentu

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
            path: "/ordersummary",
            element: <OrderSummary />,
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
            element: <ProtectedRoute isAuthenticated={authenticated} />, // Przekazywanie statusu autentyczności
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
