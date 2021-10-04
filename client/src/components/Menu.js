
import { NavLink } from "react-router-dom";
 import './Menu.css'



function Menu() {

     

    return (
        <div id='container'>

            <NavLink to="/logout" className='inactive'>Log Out</NavLink>
            <NavLink to="/allthings" id='noShow' >All Things</NavLink>
            <NavLink to="/addthings" className='noMyShow' >ADD THINGS</NavLink>
            <NavLink to="/mythings" className='noMyShow' >My Things</NavLink>
            <NavLink to="/addmything" id='noShow' >ADD My Things</NavLink>
            <NavLink to="/addmail" className='inactive' >ADD MAIL</NavLink>
            <NavLink to="/allmail" className='inactive' >MY MAIL</NavLink>

                       
                



        </div>
    )
}

export default Menu