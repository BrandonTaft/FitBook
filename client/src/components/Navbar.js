import React, { useState } from "react"
import { NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md"
import { FiMenu } from "react-icons/fi"
import "./App.css"



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
            <div id='buttonBox'>
                
                <button onClick={handleToggle}>{navbarOpen ? (
                    <MdClose style={{ color: "#3fffd2", width: "40px", height: "40px" }} />) : (
                    <FiMenu style={{ color: "#3fffd2", width: "40px", height: "40px" }} />
                )}</button>

            </div>

            <ul className={`menuNav ${navbarOpen ? " showMenu" : ""}`}>
                <NavLink to="/logout" className='inactive' id="a">Log Out</NavLink>
                <NavLink to="/publicfeed" className='noShow' id='a' >Public Feed</NavLink>
                <NavLink to="/post" className='inactive' id="a" >Add Post</NavLink>
                 <NavLink to="/private" className='inactive' id='a' >Profile</NavLink>
                <NavLink to="/messages" className='inactive' id='a' >Messages</NavLink>
            </ul>
        </nav>
    )
}

export default Navbar