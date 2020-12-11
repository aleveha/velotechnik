import React from 'react';
import Logo from "../common/Logo";
import MyButton from "../common/myButton";
import Menu from "./Menu";
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div className="header">
            <Logo />
            <div className="actionMenu">
                <Link to="/booking">
                    <MyButton content="ЗАПИСАТЬСЯ"/>
                </Link>
                <Menu />
            </div>
        </div>
    );
};

export default Header;