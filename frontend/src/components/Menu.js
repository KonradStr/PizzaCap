import React, {useState} from 'react';
import "../App.css";
import Navbar from './Navbar';
import DishList from './DishList';


const Menu = () => {

    return(
        <div className = "app">
                <Navbar/>
            <DishList/>
        </div>
    );
};

export default Menu;