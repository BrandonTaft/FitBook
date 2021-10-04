import React, { useState } from "react"
import './Navbar.css'
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"



function Navbar() {

    const [navbarOpen, setNavbarOpen] = useState(false)

    //change button from off to on at on click
    const handleToggle = () => {
        setNavbarOpen(!navbarOpen)
    }
    const closeMenu = () => {
        setNavbarOpen(false)
    }


    return (
        <nav className="navBar">
          <div id= 'buttonBox'>  
            <button onClick={handleToggle}>{navbarOpen ? (
                <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />) : (
                <FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
            )}</button>
            </div>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <NavLink to="/logout" className='inactive'>Log Out</NavLink>
            <NavLink to="/allthings" className='noShow' >All Things</NavLink>
            <NavLink to="/addthings" className='inactive' >ADD THINGS</NavLink>
            <NavLink to="/mythings" className='inactive' >My Things</NavLink>
            <NavLink to="/addmything" className='noShow' >ADD My Things</NavLink>
            <NavLink to="/addmail" className='inactive' >ADD MAIL</NavLink>
            <NavLink to="/allmail" className='inactive' >MY MAIL</NavLink>



            </ul>
        </nav>
    )
}

export default Navbar