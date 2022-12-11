import React, { useState } from "react";
import { NavLink, useLocation} from "react-router-dom";
import { MdClose, MdPostAdd } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { TiMessages } from "react-icons/ti"
import "./App.css"



function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false)
    const location = useLocation();
    //change button from off to on at on click
    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }
    const closeMenu = () => {
        setNavbarOpen(false)
    }


    return (
        <nav className="navBar">
            <button onClick={handleToggle}>
                {navbarOpen ? (
                    <MdClose className="nav-icon highlight" />) : (
                    <FiMenu className="nav-icon highlight" />
                )}
            </button>
            { location.pathname === '/publicfeed' ?
            <h1>Feed</h1>
            : "" }
            <NavLink to="/messages"><TiMessages className='nav-icon message-icon icon highlight' /></NavLink>
            <NavLink to="/profile"><CgProfile className='nav-icon profile-icon highlight' /></NavLink>
            <NavLink to="/post"><MdPostAdd className='nav-icon icon highlight' /></NavLink>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                <li><NavLink to="/publicfeed" >Home</NavLink></li>
                <li><NavLink to="/profile" >Profile</NavLink></li>
                <li><NavLink to="/messages" >Messages</NavLink></li>
                <li><NavLink to="/logout" >Log Out</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar