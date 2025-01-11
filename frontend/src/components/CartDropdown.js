import React from "react";
import "../App.css";
import {useNavigate} from "react-router-dom";

const CartDropdown = ({ cart, onClearCart, onIncreaseQuantity, onDecreaseQuantity }) => {

    const navigate = useNavigate();
    const submitOrder = async () => {
        navigate("/ordersummary");
    };

    const totalPrice = Math.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100)/100;
    console.log(cart);
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
                                    {index + 1}. {item.name} ({item.size}) - {item.price} zł{item.id}
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
                                        onClick={() => onIncreaseQuantity(item.id, item.sizeId)}
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
                    <button onClick={submitOrder} className="submit-order">
                        Złóż zamówienie
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartDropdown;