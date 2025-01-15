import React from 'react';
import {BrowserRouter as Router, Route, RouterProvider, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Menu from './pages/Menu';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin'
import MainAdminMenu from "./pages/MainAdminMenu";
import OrderDetails from "./pages/OrderDetails";
import RestaurantPanel from "./pages/RestaurantPanel"
import {CartProvider} from "./context/CartContext";
import OrderSummary from "./pages/OrderSummary";
import PromotionsPage from "./pages/PromotionsPage";
import {router} from './components/AppRouter';
import AppRouter from "./components/AppRouter";


function App() {
    return (
        /*
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
                <Route path="/promotions" element={<PromotionsPage />} />
            </Routes>
        </Router>
         */
        <AppRouter/>
    );
}

export default App;
