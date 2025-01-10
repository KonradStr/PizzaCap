import React from "react";
import "../App.css";

const CartDropdown = ({ cart, onClearCart, onIncreaseQuantity, onDecreaseQuantity, onOrderSubmit }) => {
    const totalPrice = Math.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100)/100;
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
                                <div>
                                    {index + 1}. {item.name} ({item.size}) - {item.price} zł
                                </div>
                                <div className="cart-item-controls">
                                    <button
                                        onClick={() => onDecreaseQuantity(item.id, item.sizeId)}
                                        className="cart-item-btn"
                                    >
                                        -
                                    </button>
                                    <span className="cart-item-quantity">
                        {item.quantity}
                      </span>
                                    <button
                                        onClick={() => onIncreaseQuantity(item.id, item.size)}
                                        className="cart-item-btn"
                                    >
                                        +
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h1>Suma: {totalPrice}</h1>
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