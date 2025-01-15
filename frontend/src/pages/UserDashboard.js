import React, { useState, useEffect } from "react";
import "../assets/App.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";


const UserDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [userData, setUserData] = useState({
        name: "-",
        email: "-",
        phone: "-",
    });

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/customer/${localStorage.getItem('userId')}/orders`);
                setOrders(response.data);
            } catch (err) {

            }
        };

        fetchOrders();
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('userId');
        const response = await fetch(`http://localhost:8080/getUserData`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, token}),
        });
        if (response.ok) {
            const data = await response.json(); // Parsowanie odpowiedzi do JSON
            setUserData({
                name: data.name || "-",
                email: data.email || "-",
                phone: data.phone || "-",
            });
        } else {
            navigate("/menu")
            alert("Panel twojego konta jest w tym momencie niedostępny, przepraszamy")
        }
    }

    const handleEditUserData = () => {
        alert("Funkcja edycji danych użytkownika w trakcie implementacji!");
    };

    const handleChangePassword = () => {
        alert("Funkcja zmiany hasła w trakcie implementacji!");
    };

    const onLogout = () =>{
        localStorage.removeItem('userId');
        navigate('/menu');
    }

    return (
        <div>
            <Navbar />
            <div className = "background-user-panel-container">
                <div className="container-user-panel">
                    <h1>Witaj, {userData.name}!</h1>

                    <div className="user-info">
                        <h2>Informacje o koncie:</h2>
                        <p>
                            <strong>Imię i nazwisko:</strong> {userData.name}
                        </p>
                        <p>
                            <strong>Email:</strong> {userData.email}
                        </p>
                        <p>
                            <strong>Telefon:</strong> {userData.phone}
                        </p>
                        <button onClick={handleEditUserData} className="button">
                            Edytuj dane
                        </button>
                        <button onClick={handleChangePassword} className="button-secondary">
                            Zmień hasło
                        </button>
                    </div>

                    <div className="orders">
                        <h2>Historia zamówień:</h2>
                        {orders.length === 0 ? (
                            <p>Brak zamówień do wyświetlenia.</p>
                        ) : (
                            <ul className="order-list">
                                {orders.map((order) => (
                                    <li key={order.id} className="order-item">

                                        <h3>Zamówienie nr: {order.order_id}</h3>

                                        <p>
                                            <strong>Data:</strong> {new Date(order.order_date).toLocaleString()}
                                        </p>
                                        <p>
                                            <strong>Status:</strong> {order.status}
                                        </p>
                                        <p>
                                            <strong> Zawartość zamówienia: </strong>
                                            <ul>
                                                {order.orderItemPositionList.map((item, index) => (
                                                    <li key={index}>
                                                        {item.quantity}x {item.name} ({item.item_size})
                                                    </li>
                                                ))}
                                            </ul>
                                        </p>
                                        <p>
                                            <strong>Uwagi:</strong> {order.additional_note}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <button onClick={onLogout} className="logout-button">
                        Wyloguj się
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;