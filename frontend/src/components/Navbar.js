import React, { useState } from "react";
import CartDropdown from "./CartDropdown";
import "../App.css";

const Navbar = ({cart, onOrderSubmit, setCart}) => {

    const [isCartOpen, setIsCartOpen] = useState(false);

    const toggleCart = () => {
        setIsCartOpen((prevState) => !prevState);
    };

    const deleteItem = (index) => {
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
    };


    return (
        <nav className="navbar">
            <div className="logo">PizzaCap</div>
            <ul className="nav-links">
                <li>Menu</li>
                <li>Promocje</li>
                <li>Kontakt</li>
                {cart != null &&
                    <li className="cart" onClick={toggleCart}>Koszyk ({cart.length})</li>}
            </ul>
            {isCartOpen && (<CartDropdown
                cart={cart}
                onClearCart={() => setCart([])}
                onDeleteItem={(index) => {
                    const newCart = cart.filter((item, i) => i !== index);
                    setCart(newCart);
                }}
                onOrderSubmit={onOrderSubmit}/>)}
        </nav>
    );
};

export default Navbar;