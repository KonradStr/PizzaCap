import React, { useState, useContext, useEffect } from "react";
import CartDropdown from "./CartDropdown";
import { CartContext } from "./CartContext";
import { CartVisibilityContext } from "./CartVisibilityContext";
import "../App.css";
import {useLocation, useNavigate} from "react-router-dom";

const Navbar = () => {

    const { cart, clearCart, increaseQuantity, decreaseQuantity, submitOrder} = useContext(CartContext);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartAnimation, setCartAnimation] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleCart = () => {
        setIsCartOpen((prevState) => !prevState);
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    useEffect(() => {
        if (totalItems > 0) {
            setCartAnimation(true);
            const timeout = setTimeout(() => setCartAnimation(false), 300);
            return () => clearTimeout(timeout);
        }
    }, [totalItems]);

    return (
        <nav className="navbar">
            <div onClick = {()=>{navigate("/")}} className="logo">Pizzeria</div>
            <ul className="nav-links">
                <li onClick={() => {navigate("/menu")} }>Menu</li>
                <li onClick={() => {navigate("/promotions")} }>Promocje</li>
                <li>Kontakt</li>
                {location.pathname==="/menu" && (<li className={`cart ${cartAnimation ? "cart-bounce" : ""}`} onClick={toggleCart}>
                    Koszyk ({totalItems})
                </li>)}
            </ul>
            {isCartOpen && (<CartDropdown
                cart={cart}
                onClearCart={clearCart}
                onIncreaseQuantity={increaseQuantity}
                onDecreaseQuantity={decreaseQuantity}
                onOrderSubmit={submitOrder}/>)}
        </nav>
    );
};

export default Navbar;