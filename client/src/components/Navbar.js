import { NavLink } from "react-router-dom";
import Post from "./Post";
import { addPostPopup } from "../utils/utils";
import { RiLogoutBoxFill, RiMoonClearFill, RiSunFill, RiUser3Fill, RiDraftFill, RiDiscussFill, RiHomeSmileFill } from "react-icons/ri";
import "./App.css"

function Navbar({ theme, switchTheme }) {
    return (
        <nav className="navBar">
            {theme === 'light' ? <RiMoonClearFill className='nav-icon highlight' onClick={switchTheme} /> : <RiSunFill className='nav-icon highlight' onClick={switchTheme} />}
            <NavLink to="/logout" ><RiLogoutBoxFill className="nav-icon highlight" /></NavLink>                
            <NavLink to="/feed"><RiHomeSmileFill className='nav-icon home-icon icon highlight' /></NavLink>
            <NavLink to="/messages"><RiDiscussFill className='nav-icon message-icon icon highlight' /></NavLink>
            <NavLink to="/profile"><RiUser3Fill className='nav-icon profile-icon highlight' /></NavLink>
            <RiDraftFill className='nav-icon icon highlight' onClick={addPostPopup} />
            <div id="add-post" className="add-post ">
                <Post />
            </div>
        </nav>
    )
}

export default Navbar