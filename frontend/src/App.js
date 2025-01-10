import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; 
import Menu from './components/Menu';
import Home from './components/Home';
import {CartProvider} from "./components/CartContext";


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
