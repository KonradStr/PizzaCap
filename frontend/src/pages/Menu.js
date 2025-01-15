import React, {useState} from 'react';
import "../assets/App.css";
import Navbar from '../components/Navbar';
import DishList from '../components/DishList';


const Menu = () => {

    return(
        <div className = "app">
                <Navbar/>
            <DishList/>
        </div>
    );
};

export default Menu;