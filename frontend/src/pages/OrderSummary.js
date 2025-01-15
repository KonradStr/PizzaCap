import React, {useContext, useEffect, useState} from "react";
import "../assets/App.css";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
import {useNavigate } from 'react-router-dom';

const OrderSummary = () => {

    const navigate = useNavigate();
    const {cart, setCart} = useContext(CartContext);
    const totalPrice = Math.round(cart.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 100)/100;

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        address: "",
        phone: "",
        additionalNote: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("");
    const [deliveryMethod, setDeliveryMethod] = useState("");

    const getCart = async () => {
        try {
            const response = await fetch(`http://localhost:8080/cart/${localStorage.getItem('cartId')}`);
            const data = response.json();
            if((await data).items.length === 0){
                navigate('/menu')
            }else{
                setCart((await data).items);
            }
        }catch (error){
            console.error("Błąd pobierania koszyka")
        }
    }

    useEffect( () => {
        getCart();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleOrderSubmit = async () => {
        const { firstName, lastName, address, phone ,additionalNote} = userData;
        let canOrder = true;
        if(!firstName){
            document.getElementById("name").style.border = "1px solid red";
            canOrder = false;
        }
        if(!lastName) {
            document.getElementById("lastName").style.border = "1px solid red";
            canOrder = false;
        }
        if(!address) {
            document.getElementById("address").style.border = "1px solid red";
            canOrder = false;
        }
        if(!deliveryMethod){
            alert("Wybierz metodę dostawy");
            canOrder = false;
        }
        if(!paymentMethod){
            alert("Wybierz metodę płatności");
            canOrder = false;
        }
        const restaurantId = localStorage.getItem('selectedLocation');
        const customerId = localStorage.getItem('userId');

        if(canOrder) {
            try {
                const response = await fetch(`http://localhost:8080/cart/${localStorage.getItem('cartId')}/order`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({additionalNote, address, restaurantId, customerId, paymentMethod}),
                });
                const pathToOrder = "/zamowienie/"+await response.json();
                console.log(pathToOrder);
                navigate(pathToOrder);
            } catch (error) {
                console.error("Błąd synchronizacji koszyka:", error);
            }
        }
    }



    return (
        <div className = "container-order-summary">
            <Navbar/>
            <div className="order-summary">
                <h1>Podsumowanie zamówienia</h1>
                <div className="cart-summary">
                    <h2>Koszyk</h2>

                    {cart.map((item, index) =>(
                        <div className="cart-item">
                            <p>{index + 1}. {item.name}</p>
                            <p>Rozmiar: {item.size}</p>
                            <p>Ilość: {item.quantity}</p>
                            <p>Cena: {Math.round(item.price * item.quantity * 100)/100}</p>
                        </div>
                    ))}
                    <h3>Cena końcowa: {totalPrice} zl</h3>
                </div>
            </div>

            <div className="order-summary">
                {/* Formularz danych użytkownika */}
                <div className="user-details">
                    <h2>Dane użytkownika</h2>
                    <label>
                        Imię:
                        <input
                            type="text"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleInputChange}
                            id="name"
                        />
                    </label>
                    <label>
                        Nazwisko:
                        <input
                            type="text"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleInputChange}
                            id="lastName"
                        />
                    </label>
                    <label>
                        Adres:
                        <input
                            type="text"
                            name="address"
                            value={userData.address}
                            onChange={handleInputChange}
                            id="address"
                        />
                    </label>
                    <label>
                        Numer telefonu:
                        <input
                            type="text"
                            name="phone"
                            value={userData.phone}
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Dodatkowe informacje:
                        <input
                            type="text"
                            name="additionalNote"
                            value={userData.additionalNote}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
            </div>
            <div className="order-summary">


                {/* Metody płatności i dostawy */}
                <div className="payment-delivery">
                    <h2>Metoda płatności</h2>
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="karta"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Karta płatnicza
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="payment"
                            value="gotowka"
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        Gotówka przy odbiorze
                    </label>
                </div>
            </div>
<div className="order-summary">

                    <h2>Metoda dostawy</h2>
                    <label>
                        <input
                            type="radio"
                            name="delivery"
                            value="dostawa"
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                        />
                        Dostawa do domu
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="delivery"
                            value="odbior osobisty"
                            onChange={(e) => setDeliveryMethod(e.target.value)}
                        />
                        Odbiór osobisty
                    </label>
</div>
            <div className="order-summary">

                {/* Przyciski */}
                <button className="submit-order" onClick={handleOrderSubmit}>
                    Złóż zamówienie
                </button>
            </div>
        </div>
    );
};

export default OrderSummary;
