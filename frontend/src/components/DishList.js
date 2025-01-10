import React, {useEffect, useState, useContext} from "react";
import DishCard from "./DishCard";
import "../App.css";
import { CartContext } from "./CartContext";

{/*
const pizzas = [
    {
        id: 1,
        name: "Margherita",
        price: { small: 20, medium: 25, large: 30 },
        description: "Klasyczna pizza z sosem pomidorowym, mozzarellą i bazylią.",
        image: "../assets/Margherita.jpg",
    },
    {
        id: 2,
        name: "Pepperoni",
        price: { small: 20, medium: 25, large: 30 },
        description: "Pizza z dodatkiem pikantnej kiełbasy pepperoni i mozzarelli.",
        image: "https://source.unsplash.com/400x300/?pizza,pepperoni",
    },
    {
        id: 3,
        name: "Hawajska",
        price: { small: 20, medium: 25, large: 30 },
        description: "Kontrowersyjna, ale pyszna! Z szynką, ananasem i mozzarellą.",
        image: "https://source.unsplash.com/400x300/?pizza,hawaiian",
    },
    {
        id: 4,
        name: "Wegetariańska",
        price: { small: 20, medium: 25, large: 30 },
        description:
            "Pizza pełna świeżych warzyw: papryki, oliwek, pieczarek i cukinii.",
        image: "https://source.unsplash.com/400x300/?pizza,vegetarian",
    },
    {
        id: 5,
        name: "Parma",
        price: { small: 20, medium: 25, large: 30 },
        description:
            "Pizza pełna świeżych warzyw: papryki, oliwek, pieczarek i cukinii.",
        image: "https://source.unsplash.com/400x300/?pizza,vegetarian",
    },
    {
        id: 6,
        name: "Campione",
        price: { small: 20, medium: 25, large: 30 },
        description:
            "Pizza pełna świeżych warzyw: papryki, oliwek, pieczarek i cukinii.",
        image: "https://source.unsplash.com/400x300/?pizza,vegetarian",
    },
    {
        id: 7,
        name: "Piacere",
        price: { small: 20, medium: 25, large: 30 },
        description:
            "Pizza pełna świeżych warzyw: papryki, oliwek, pieczarek i cukinii.",
        image: "https://source.unsplash.com/400x300/?pizza,vegetarian",
    },
    {
        id: 8,
        name: "Napoletana",
        price: { small: 20, medium: 25, large: 30 },
        description:
            "Pizza pełna świeżych warzyw: papryki, oliwek, pieczarek i cukinii.",
        image: "https://source.unsplash.com/400x300/?pizza,vegetarian",
    },
    {
        id: 9,
        name: "Inverno",
        price: { small: 20, medium: 25, large: 30 },
        description:
            "Pizza pełna świeżych warzyw: papryki, oliwek, pieczarek i cukinii.",
        image: "https://source.unsplash.com/400x300/?pizza,vegetarian",
    },
];
*/}


const DishList = () =>{

    const { addToCart } = useContext(CartContext);
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
            fetch('http://localhost:8080/menu_items')
            .then((response) => response.json())
            .then((data) => setPizzas(data))
            .catch((error) => console.error('Error fetching restaurants:', error));
    }, []);

    return(
        <div className="menu-grid">
            <div className="pizzas-container">
                {pizzas.map((pizza) => (
                    <DishCard key={pizza.menuId} pizza={pizza} onAddToCart={addToCart}/>
                ))}
            </div>
        </div>
    );
};

export default DishList;