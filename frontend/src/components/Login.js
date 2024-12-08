import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';
import Navbar from "./Navbar";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });

      if (response.status === 200) {
        navigate('/menu');
      }
    } catch (error) {
      setError(
        error.response?.data || 'Wystąpił błąd podczas logowania.'
      );
      document.getElementById("email").style.border = "1px solid red";
      document.getElementById("password").style.border = "1px solid red";
    }

  };

  return (

    <div className = "app">
    <Navbar />

    <div className = "container" >
      <div className = "card" >
        <h2>Logowanie</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            placeholder=" "
            onChange={(e) => setEmail(e.target.value)}
            className = "input"
            id="email"
          />
          <label form = "email" className = "form_label_login">Adres email</label>
          <input
            type="password"
            value={password}
            placeholder=""
            onChange={(e) => setPassword(e.target.value)}
            className = "input"
            id="password"
          />
          <label form = "password" className = "form_label_passwd">Hasło</label>
          {error && <p className = "error">{error}</p>}
          <button type="submit" className = "submitButton" >Zaloguj</button>
        </form>


        <div className = "footer">
          <button onClick={() => navigate('/register')} className = "linkButton">
            Nie masz konta? Zarejestruj się
          </button>
          <button onClick={() => navigate('/')} className = "linkButton">
            Zapomniałem hasła
          </button>
        </div>

        <div className = "homeButtonContainer">
          <button onClick={() => navigate('/')} className = "homeButton">
            Home
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}


export default Login;
