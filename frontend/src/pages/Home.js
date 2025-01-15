"use client";
import React, {useState, useEffect, useContext} from 'react';
import {useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar"
import "../assets/App.css";
import {CartContext} from "../context/CartContext";


const LocationSelector = () => {


  const navigate = useNavigate();
  const [locations, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const {clearCart} = useContext(CartContext);

  useEffect(() => {
    localStorage.removeItem('selectedLocation');
    fetch('http://localhost:8080/restaurants')
        .then((response) => response.json())
        .then((data) => setRestaurants(data))
        .catch((error) => console.error('Error fetching restaurants:', error));

  }, []);



  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSelect = () => {
    if (selectedLocation) {
      if(localStorage.getItem('selectedLocation') !== selectedLocation){
        localStorage.setItem('cartId', null);
        clearCart();
      }
      localStorage.setItem('selectedLocation', selectedLocation)
      navigate('/menu')
    } else {
      alert("Wybierz lokal z listy.");
    }
  };



  return (

      <div className="app">

          <Navbar/>
        {/* Główna sekcja */}


        <div className="main-section">
          <div className="selection-box">
            <h2>Wybierz swój lokal</h2>
            <select
                value={selectedLocation}
                onChange={handleLocationChange}
                className="dropdown"
            >
              <option value="">-- Wybierz lokal --</option>
              {locations.map((location) => (
                  <option key={location.restaurantId} value={location.restaurantId}>
                    {location.address}
                  </option>
              ))}
            </select>
            {/*
            <div>Ostatnio wybrany lokal </div>
            {localStorage.getItem('selectedLocation') && <button onClick={handleSelect} className="select-button">{localStorage.getItem('selectedLocation')}</button>}
            */}
            <button onClick={handleSelect} className="select-button">
              Wybierz
            </button>
          </div>
        </div>
      </div>

  );
};

export default LocationSelector;