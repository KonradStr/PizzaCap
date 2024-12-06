import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/restaurants')
      .then((response) => response.json())
      .then((data) => setRestaurants(data))
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRestaurantSelect = () => {
    navigate(`/menu`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Wybierz Restaurację</h2>
        
        <select
          value={selectedRestaurant}
          onChange={(e) => setSelectedRestaurant(e.target.value)}
          style={styles.select}
        >
          <option value="">Wybierz...</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant.restaurant_id} value={restaurant.restaurant_id}>
              {restaurant.address}
            </option>
          ))}
        </select>

        <div style={styles.loginButtonContainer}>
          <button onClick={handleLogin} style={styles.loginButton}>
            Zaloguj
          </button>
        </div>

        <div style={styles.footer}>
          <button onClick={handleRestaurantSelect} style={styles.menuButton}>
            Przeglądaj menu
          </button>
        </div>
      </div>
    </div>
  );
}

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
    wordWrap: 'break-word',
  },
  select: {
    width: '100%',
    padding: '10px',
    margin: '20px 0',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    color: 'black',
    whiteSpace: 'normal',
  },
  loginButtonContainer: {
    textAlign: 'right',
  },
  loginButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  footer: {
    marginTop: '20px',
  },
  menuButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Home;
