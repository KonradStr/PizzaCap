import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/App.css'
import Navbar from "../components/Navbar";

function Register() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    password: '',
  });

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    formData.email = email;
    formData.first_name = name;
    formData.password = password;
    formData.phone_number = phone;
    formData.last_name = lastname;

    if(!!email && !! name && !!lastname && !!phone && !!password) {

      try {
        const response = await axios.post('http://localhost:8080/register', formData);

        if (response.status === 200) {
          setSuccess('Rejestracja zakończona sukcesem! Możesz się teraz zalogować.');
          setError('');
          setTimeout(() => navigate('/'), 2000);
        }
      } catch (error) {
        setError(error.response?.data || 'Wystąpił błąd podczas rejestracji.');
        setSuccess('');
      }
    }else{

      document.getElementById("email").style.border = "1px solid red";
      document.getElementById("lastname-reg").style.border = "1px solid red";
      document.getElementById("email-reg").style.border = "1px solid red";
      document.getElementById("phone-reg").style.border = "1px solid red";
      document.getElementById("password-reg").style.border = "1px solid red";
      setError(error.response?.data || 'Wystąpił błąd podczas rejestracji.');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
      <div >
        <Navbar/>
    <div className="container">

      <div className="card">
        <h2>Rejestracja</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder=" "
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className="input"
            id="email"
          />
          <label form = "email" className = "form_label_login">Imie</label>
          <input
            type="text"
            placeholder=" "
            value={lastname}
            onChange={(e)=>setLastname(e.target.value)}
            className="input"
            id="lastname-reg"
          />
          <label form = "lastname-reg" className = "form_label_lastname">Nazwisko</label>
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="input"
            id="email-reg"
          />
          <label form = "email-reg" className = "form_label_email-reg">Adres email</label>
          <input
            type="text"
            name="phone_number"
            placeholder=" "
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="input"
            id="phone-reg"
          />
          <label form = "phone-reg" className = "form_label_phone-reg">Numer telefonu</label>
          <input
            type="password"
            name="password"
            placeholder=" "
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="input"
            id = "password-reg"
          />
          <label form = "password-reg" className = "form_label_password-reg">Hasło</label>
          <button type="submit" className="submitButton">Zarejestruj</button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <div className="footer">
          <button onClick={() => navigate('/login')} className="linkButton">
            Przejdź do logowania
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}


export default Register;
