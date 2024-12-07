import React, { useState, useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import Navbar from "./Navbar"
import "../App.css";


const LocationSelector = () => {

  const navigate = useNavigate();
  const [locations, setRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
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
      localStorage.setItem('selectedLocation', selectedLocation)
      navigate('/menu')
    } else {
      alert("Wybierz lokal z listy.");
    }
  };

  return (
      <div className="app">

        <Navbar />
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
                  <option key={location.restaurant_id} value={location.restaurant_id}>
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