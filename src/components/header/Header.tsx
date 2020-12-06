import React from 'react';
import Logo from "../common/Logo";
import MyButton from "../common/myButton";
import Menu from "./Menu";

const Header = () => {
    return (
        <div className="header">
            <Logo />
            <div className="actionMenu">
                <MyButton content="ЗАПИСАТЬСЯ" path="/booking"/>
                <Menu />
            </div>
        </div>
    );
};

export default Header;