import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RestaurantPanel = () => {
    const { restaurantId } = useParams();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/admin/restaurant/${restaurantId}`);
                setOrders(response.data);
            } catch (err) {
                setError("Błąd podczas ładowania zamówień");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [restaurantId]);

    const handleStatusChange = async (orderId) => {
        const newStatus = selectedStatus[orderId];
        if (!newStatus) return;

        try {
            const response = await axios.put(`http://localhost:8080/admin/order/${orderId}/status`, { status: newStatus });
            // Update status in the state after successful change
            setOrders(orders.map(order =>
                order.order_id === orderId ? { ...order, status: newStatus } : order
            ));
        } catch (err) {
            setError('Błąd przy zmianie statusu');
        }
    };

    // Dodajemy funkcję obsługującą zmianę statusu w select
    const handleSelectChange = (orderId, newStatus) => {
        setSelectedStatus(prevState => ({
            ...prevState,
            [orderId]: newStatus
        }));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Nowe':
                return '#007bff'; // Niebieski
            case 'W trakcie realizacji':
                return '#ff9900'; // Pomarańczowy
            case 'Gotowe do wysyłki':
                return '#28a745'; // Zielony
            case 'W drodze':
                return '#ffc907'; // Żółty
            case 'Zakończone':
                return '#6c757d'; // Szary
            default:
                return '#000'; // Domyślny kolor (czarny)
        }
    };

    if (loading) return <div style={styles.loading}>Ładowanie...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.header}>Zamówienia dla restauracji {restaurantId}</h2>

                <table style={styles.table}>
                    <thead>
                    <tr>
                        <th style={styles.tableHeader}>ID zamówienia</th>
                        <th style={styles.tableHeader}>Data zamówienia</th>
                        <th style={styles.tableHeader}>Status</th>
                        <th style={styles.tableHeader}>Uwagi dodatkowe</th>
                        <th style={styles.tableHeader}>Pozycje zamówienia</th>
                        <th style={styles.tableHeader}>Zmień status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.map(order => (
                        <tr key={order.order_id} style={styles.tableRow}>
                            <td>{order.order_id}</td>
                            <td>{new Date(order.order_date).toLocaleString()}</td>
                            <td style={{ color: getStatusColor(order.status), fontWeight: 'bold' }}>
                                {order.status}
                            </td>
                            <td>{order.additional_note}</td>
                            <td>
                                <ul style={styles.list}>
                                    {order.orderItemPositionList.map((item, index) => (
                                        <li key={index} style={styles.listItem}>
                                            {item.quantity}x {item.name} ({item.item_size})
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>
                                <div style={styles.statusChangeContainer}>
                                    <select
                                        style={styles.select}
                                        value={selectedStatus[order.order_id] || order.status}
                                        onChange={(e) => handleSelectChange(order.order_id, e.target.value)}
                                    >
                                        <option value="Nowe">Nowe</option>
                                        <option value="W trakcie realizacji">W trakcie realizacji</option>
                                        <option value="Gotowe do wysyłki">Gotowe do wysyłki</option>
                                        <option value="W drodze">W drodze</option>
                                        <option value="Zakończone">Zakończone</option>
                                    </select>
                                    <button
                                        style={styles.confirmButton}
                                        onClick={() => handleStatusChange(order.order_id)}
                                    >
                                        Potwierdź
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
    },
    card: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 15px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '1200px',
        overflowX: 'auto',
    },
    header: {
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
        color: '#333',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        padding: '12px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'left',
    },
    tableRow: {
        borderBottom: '1px solid #ddd',
    },
    list: {
        paddingLeft: '20px',
        listStyleType: 'none',
        margin: '0',
    },
    listItem: {
        fontSize: '14px',
        marginBottom: '5px',
    },
    loading: {
        fontSize: '18px',
        color: '#007bff',
        textAlign: 'center',
        marginTop: '50px',
    },
    error: {
        fontSize: '18px',
        color: 'red',
        textAlign: 'center',
        marginTop: '50px',
    },
    statusChangeContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    select: {
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '14px',
        width: '200px',
    },
    confirmButton: {
        padding: '8px 15px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '14px',
    },
};

export default RestaurantPanel;
