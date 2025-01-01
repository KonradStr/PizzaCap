import React, {useState} from "react";
import "../App.css";

const PizzaCard = ({pizza, onAddToCart}) => {
    const [selectedSize, setSelectedSize] = useState(pizza.sizes[0].menuSizeId);

    const handleSizeChange = (e) => {
        setSelectedSize(Number(e.target.value));
    };

    const addToCart = () => {
        const selectedPizzaSize = pizza.sizes.find(size => size.menuSizeId === selectedSize);
        const item = {
            id: pizza.menuId,
            name: pizza.name,
            size: selectedPizzaSize.itemSize,
            price: selectedPizzaSize.price,
        };
        onAddToCart(item);
    };

    return (
        <div className="pizza-card">
            <img src={pizza.image} alt={pizza.name} className="pizza-image" />
            <div className="pizza-details">
                <h3>{pizza.menuId}. {pizza.name}</h3>

                <div className="pizza-select">
                    <label>Wybierz rozmiar:</label>
                    <select
                        id={`size-select-${pizza.menuId}`}
                        value={selectedSize}
                        onChange={handleSizeChange}
                    >
                        {pizza.sizes.map((size) => (
                            <option key={size.menuSizeId} value={size.menuSizeId}>
                                {size.itemSize} - {size.price} PLN
                            </option>
                        ))}
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