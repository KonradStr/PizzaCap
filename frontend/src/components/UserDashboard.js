import React, { useState, useEffect } from "react";
import "../App.css";
import {useNavigate} from "react-router-dom";

const mockOrders = [
    { id: 1, date: "2023-12-01", items: ["Pizza Margherita", "Napój Cola"], total: 42.0 },
    { id: 2, date: "2023-12-10", items: ["Pizza Pepperoni"], total: 35.0 },
    { id: 3, date: "2024-01-05", items: ["Pizza Veggie", "Deser Tiramisu"], total: 50.0 },
];

const UserDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [userData, setUserData] = useState({
        name: "-",
        email: "-",
        phone: "-",
    });

    useEffect(() => {
        setOrders(mockOrders);
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
            console.error("Błąd podczas pobierania danych użytkownika", response.status);
        }
    }

    useEffect(() =>{
        fetchUserData();
    }, [])

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
                                <p>
                                    <strong>Data:</strong> {order.date}
                                </p>
                                <p>
                                    <strong>Produkty:</strong> {order.items.join(", ")}
                                </p>
                                <p>
                                    <strong>Razem:</strong> {order.total.toFixed(2)} zł
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
    );
};

export default UserDashboard;