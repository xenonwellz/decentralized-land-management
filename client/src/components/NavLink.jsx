import React from 'react';
import { NavLink as NL } from "react-router-dom";

const NavLink = ({ to, children, onClick }) => {
    return (
        <NL to={to} className={({ isActive }) => "nav " + (isActive ? "nav-active" : "")} onClick={onClick}>
            {children}
        </NL>
    );
}

export default NavLink;
