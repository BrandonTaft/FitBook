import { NavLink } from "react-router-dom";
 import './Menu.css'



function Menu() {

     

    return (
        <div id='container'>

            <NavLink to="/logout" className='inactive'>Log Out</NavLink>
            <NavLink to="/allthings" className='inactive' >All Workouts</NavLink>
            
           
            <NavLink to="/addmything" className='inactive' >Add Personal Workout</NavLink>
            
            <NavLink to="/allmail" className='inactive' >Mail</NavLink>

                       
                



        </div>
    )
}

export default Menu