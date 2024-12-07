import React, { useState } from "react";
import "../App.css";
import margherita from "./Margherita.jpg";

const PizzaCard = ({ pizza, onAddToCart }) => {
    const [selectedSize, setSelectedSize] = useState("small");

    const handleSizeChange = (e) => {
        setSelectedSize(e.target.value);
    };

    const addToCart = () => {
        const item = {
            id: pizza.id,
            name: pizza.name,
            size: selectedSize,
            price: pizza.price[selectedSize],
        };
        onAddToCart(item);
    };

    return (
        <div className="pizza-card">
            <img src={"https://i.ibb.co/9NXMVtZ/Margherita.jpg"} alt={pizza.name} className="pizza-image" />
            <div className="pizza-details">
                <h3>{pizza.menu_id}. {pizza.name}</h3>
                <div className="pizza-select">
                    <select
                        id={`size-select-${pizza.menu_id}`}
                        value={selectedSize}
                        onChange={handleSizeChange}
                    >
                        <option value="small">Mała - {pizza.price} zł</option>
                        <option value="medium">Średnia - {pizza.price} zł</option>
                        <option value="large">Duża - {pizza.price} zł</option>
                    </select>
                </div>
                <p className="pizza-description">{pizza.description}</p>
                <p className="additional-info">+2 sosy gratis</p>
                <button onClick={addToCart} className="add-button">
                    Dodaj do koszyka
                </button>
            </div>
        </div>
    );
};

export default PizzaCard;