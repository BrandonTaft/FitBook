import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import "./App.css"



function Hamburger() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    };
    const closeMenu = () => {
        setNavbarOpen(false)
    };

    return (
        <>
            <button className="hamburger" onClick={handleToggle}>
                {navbarOpen ? (
                    <MdClose className="nav-icon highlight" />) : (
                    <FiMenu className="nav-icon highlight" />
                )}
            </button>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                <li><NavLink to="/feed" >Home</NavLink></li>
                <li><NavLink to="/profile" >Profile</NavLink></li>
                <li><NavLink to="/messages" >Messages</NavLink></li>
                <li><NavLink to="/logout" >Log Out</NavLink></li>
            </ul>
        </>
    )
}

export default Hamburger