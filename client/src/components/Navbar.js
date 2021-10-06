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
                <MdClose style={{ color: "#3fffd2", width: "40px", height: "40px" }} />) : (
                <FiMenu style={{ color: "#3fffd2", width: "40px", height: "40px" }} />
            )}</button>
            </div>
            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
            <NavLink to="/logout" className='inactive'id="a">Log Out</NavLink>
            <NavLink to="/allthings" className='noShow'id='a' >All Workouts</NavLink>
            <NavLink to="/addthings" className='inactive'id='a' >Add Workout</NavLink>
            <NavLink to="/mythings" className='inactive'id='a' >Personal Workouts</NavLink>
            <NavLink to="/addmything" className='noShow'id='a' >Add Personal Workout</NavLink>
       
            <NavLink to="/allmail" className='inactive'id='a' >Mail</NavLink>



            </ul>
        </nav>
    )
}

export default Navbar