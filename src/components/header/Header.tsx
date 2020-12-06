import React from 'react';
import Logo from "../common/Logo";
import BookingButton from "../common/BookingButton";
import Menu from "./Menu";

const Header = () => {
    return (
        <div className="header">
            <Logo />
            <div className="actionMenu">
                <BookingButton />
                <Menu />
            </div>
        </div>
    );
};

export default Header;