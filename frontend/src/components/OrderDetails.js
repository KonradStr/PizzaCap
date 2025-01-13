import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "./Navbar";

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        setTimeout(function(){
            window.location.reload(1);
        }, 60000);
        const fetchOrderDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8080/zamowienie/${orderId}`);
                const data = await response.json();
                setOrder(data);
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Nowe':
                return '#007bff';
            case 'W trakcie realizacji':
                return '#ff9900';
            case 'Gotowe do wysyłki':
                return '#28a745';
            case 'W drodze':
                return '#ffc907';
            case 'Zakończone':
                return '#6c757d';
            default:
                return '#000';
        }
    };

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
    <div className="order-detail-container">
        <Navbar/>
        <div style={styles.container}>
            <div style={styles.card}>
                <h1>Zamówienie #{order.order_id}</h1>

                <ul style={styles.list}>
                    <li style={styles.listItem}><strong>Cena całkowita:</strong> {Math.round(order.total_price * 100)/100} PLN</li>
                    <li style={styles.listItem}><strong>Data zamówienia:</strong> {new Date(order.order_date).toLocaleString()}</li>
                    <li style={styles.listItem}><strong>Status:</strong> <span style={{ color: getStatusColor(order.status) }}>{order.status}</span></li>
                    <li style={styles.listItem}><strong>Adres dostawy:</strong> {order.customer_address}</li>
                </ul>

                <h2>Informacje o zamawiającym</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}><strong>Imię:</strong> {order.first_name}</li>
                    <li style={styles.listItem}><strong>Nazwisko:</strong> {order.last_name}</li>
                    <li style={styles.listItem}><strong>Email:</strong> {order.email}</li>
                    <li style={styles.listItem}><strong>Telefon:</strong> {order.customer_phone_number}</li>
                </ul>

                <h2>Informacje o restauracji</h2>
                <ul style={styles.list}>
                    <li style={styles.listItem}><strong>Adres:</strong> {order.restaurant_address}</li>
                    <li style={styles.listItem}><strong>Telefon:</strong> {order.restaurant_phone_number}</li>
                </ul>

                {order.additional_note && (
                    <div>
                        <h3>Dodatkowe uwagi:</h3>
                        <p>{order.additional_note}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '400px',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
    },
    listItem: {
        textAlign: 'left',
        marginBottom: '10px',
    },
};

export default OrderDetails;
