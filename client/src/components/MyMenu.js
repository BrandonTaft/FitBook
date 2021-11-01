import { NavLink } from "react-router-dom";
import  "./App.css"


function Menu() {

    return (
        <div id='container'>
            <NavLink to="/logout" className='inactive'>Log Out</NavLink>
            <NavLink to="/publicfeed" className='inactive' >Public Feed</NavLink>
           
            <NavLink to="/messages" className='inactive' >Messages</NavLink>
        </div>
    )
}

export default Menu