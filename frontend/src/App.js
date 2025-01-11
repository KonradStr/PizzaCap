import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import Menu from './components/Menu';
import Home from './components/Home';
import AdminLogin from './components/AdminLogin'
import MainAdminMenu from "./components/MainAdminMenu";
import OrderDetails from "./components/OrderDetails";
import RestaurantPanel from "./components/RestaurantPanel"
import {CartProvider} from "./components/CartContext";
import OrderSummary from "./components/OrderSummary";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/admin" element={<AdminLogin/>}/>
                <Route path="/admin/settings" element={<MainAdminMenu/>}/>
                <Route path="/zamowienie/:orderId" element={<OrderDetails/>}/>
                <Route path="/admin/restaurant/:restaurantId" element={<RestaurantPanel/>}/>
                <Route path="/ordersummary" element={<OrderSummary />} />
            </Routes>
        </Router>
    );
}

export default App;
