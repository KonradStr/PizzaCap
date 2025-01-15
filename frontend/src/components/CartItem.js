import React from "react";
import "../assets/App.css";

const CartItem = ({ name, size, price }) => {
    return (
        <div className="cart-item">
            <h3>{name}</h3>
            <div className="size">{size}</div>
            <div className="bottom-section">
                <div className="quantity-section">
                    <button>-</button>
                    <div>1</div>
                    <button>+</button>
                </div>
                <div className="price">{price} zł</div>
            </div>
        </div>
    );
};

export default CartItem;