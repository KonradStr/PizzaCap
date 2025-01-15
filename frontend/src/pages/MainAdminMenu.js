import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

const MainAdminMenu = () => {
    const [operation, setOperation] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [formData, setFormData] = useState({});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:8080/restaurants')
            .then(response => setRestaurants(response.data))
            .catch(error => console.error('Error fetching restaurants:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSizeChange = (index, field, value) => {
        const sizes = formData.sizes || [];
        sizes[index] = { ...sizes[index], [field]: value };
        setFormData({ ...formData, sizes });
    };

    const addSizeField = () => {
        setFormData({ ...formData, sizes: [...(formData.sizes || []), {}] });
    };

    const removeSizeField = (index) => {
        const sizes = formData.sizes || [];
        sizes.splice(index, 1);
        setFormData({ ...formData, sizes });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let endpoint = '';

        switch (operation) {
            case 'addRestaurant':
                endpoint = 'http://localhost:8080/admin/restaurants';
                break;
            case 'addMenuItem':
                endpoint = 'http://localhost:8080/admin/menu';
                break;
            case 'addAdmin':
                endpoint = 'http://localhost:8080/admin/admin_manager';
                break;
            default:
                return;
        }

        try {
            const response = await axios.post(endpoint, formData);
            setSuccess('Operacja zakończona sukcesem!');
            setError('');
        } catch (error) {
            setError('Wystąpił błąd. Spróbuj ponownie.');
            setSuccess('');
        }
    };

    const renderForm = () => {
        switch (operation) {
            case 'addRestaurant':
                return (
                    <>
                        <input
                            type="text"
                            name="address"
                            placeholder="Adres restauracji"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="phone_number"
                            placeholder="Numer telefonu"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="admin_username"
                            placeholder="Nazwa użytkownika administratora"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <input
                            type="password"
                            name="admin_password"
                            placeholder="Hasło administratora"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                    </>
                );
            case 'addMenuItem':
                return (
                    <>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nazwa pozycji menu"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Opis"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="type"
                            placeholder="Typ"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <input
                            type="text"
                            name="image"
                            placeholder="URL obrazu"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <div>
                            <button
                                type="button"
                                onClick={addSizeField}
                                style={styles.addButton}
                            >
                                Dodaj rozmiar
                            </button>
                            {(formData.sizes || []).map((size, index) => (
                                <div key={index} style={styles.sizeFieldContainer}>
                                    <input
                                        type="text"
                                        placeholder="Rozmiar"
                                        onChange={(e) =>
                                            handleSizeChange(index, 'itemSize', e.target.value)
                                        }
                                        style={styles.input}
                                    />
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="Cena"
                                        onChange={(e) =>
                                            handleSizeChange(index, 'price', e.target.value)
                                        }
                                        style={styles.input}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSizeField(index)}
                                        style={styles.removeButton}
                                    >
                                        Usuń
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                );
            case 'addAdmin':
                return (
                    <>
                        <input
                            type="text"
                            name="username"
                            placeholder="Nazwa użytkownika"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Hasło"
                            onChange={handleInputChange}
                            style={styles.input}
                        />
                        <select
                            name="restaurantId"
                            onChange={(e) =>
                                handleInputChange({ target: { name: 'restaurant', value: { restaurantId: e.target.value } } })
                            }
                            style={styles.select}
                        >
                            <option value="">Wybierz restaurację</option>
                            {restaurants.map(({ restaurantId, address }) => (
                                <option key={restaurantId} value={restaurantId}>
                                    {address}
                                </option>
                            ))}
                        </select>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Admin Settings</h2>
                <div style={styles.buttonsContainer}>
                    <button
                        onClick={() => setOperation('addRestaurant')}
                        style={styles.operationButton}
                    >
                        Dodaj Restaurację
                    </button>
                    <button
                        onClick={() => setOperation('addMenuItem')}
                        style={styles.operationButton}
                    >
                        Dodaj Pozycję Menu
                    </button>
                    <button
                        onClick={() => setOperation('addAdmin')}
                        style={styles.operationButton}
                    >
                        Dodaj Administratora
                    </button>
                </div>


                <form onSubmit={handleSubmit} style={styles.form}>
                    {renderForm()}
                    {operation && (
                        <button type="submit" style={styles.submitButton}>
                            Zatwierdź
                        </button>
                    )}
                </form>

                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}

                <button onClick={()=>{localStorage.removeItem('username'); localStorage.removeItem('token');navigate('/admin')}} style={styles.logoutButton}> Wyloguj </button>
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
        backgroundColor: '#f4f7fc',
        overflowY: 'auto', // Dodano możliwość przewijania
    },
    card: {
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '400px',
        maxHeight: '90vh', // Ustawiono maksymalną wysokość karty
        overflowY: 'auto', // Umożliwienie przewijania zawartości
    },
    buttonsContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: '20px',
    },
    operationButton: {
        padding: '12px 24px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        margin: '0 5px',
    },
    input: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    select: {
        width: '100%',
        padding: '12px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        boxSizing: 'border-box',
    },
    addButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px 20px',
        cursor: 'pointer',
    },
    removeButton: {
        backgroundColor: '#ff4d4d',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '5px 10px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    sizeFieldContainer: {
        margin: '10px 0',
    },
    submitButton: {
        padding: '12px 20px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
    },
    error: {
        color: 'red',
        marginTop: '10px',
    },
    success: {
        color: 'green',
        marginTop: '10px',
    },
    logoutButton: {
        marginTop: '10px',
        padding: '12px 20px',
        backgroundColor: '#c23636',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: '100%',
    }
};

export default MainAdminMenu;
