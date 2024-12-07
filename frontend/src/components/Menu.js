import React, {useState} from 'react';
import "../App.css";
import Navbar from './Navbar';
import DishList from './DishList';


const Menu = () => {

    const [cart, setCart] = useState([]); // Stan koszyka

    // Funkcja dodawania do koszyka
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const handleOrderSubmit = () => {
        //tutaj do api wysyła
    };

    return(
        <div className = "app">
            <Navbar cart={cart} onOrderSubmit={handleOrderSubmit} setCart={setCart}/>
            <DishList onAddToCart={addToCart}/>
        </div>
    );
};

export default Menu;