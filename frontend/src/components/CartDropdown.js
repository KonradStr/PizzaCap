import React from "react";
import "../App.css";

const CartDropdown = ({ cart, onClearCart, onOrderSubmit }) => {
    return (
        <div className="cart-dropdown">
            <div className = "cart-title">
                <h3 className >Moje zamówienie</h3>
            </div>
            {cart.length === 0 ? (
                <p>Twój koszyk jest pusty.</p>
            ) : (
                <div>
                    <ul className="cart-items">
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                {item.name} ({item.size}) - {item.price} zł
                            </li>
                        ))}
                    </ul>
                    <button onClick={onClearCart} className="clear-cart">
                        Wyczyść koszyk
                    </button>
                    <button onClick={onOrderSubmit} className="submit-order">
                        Złóż zamówienie
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartDropdown;