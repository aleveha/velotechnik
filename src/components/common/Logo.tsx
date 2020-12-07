import React from 'react';
import logo from '../../img/logo-min.jpg';
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/home" className="logo">
            <div>
                <img src={logo} alt="logo"/>
            </div>
            <div className="logoLabel">
                <p>ВЕЛО</p>
                <p>ТЕХНИК</p>
            </div>
        </Link>
    );
};

export default Logo;