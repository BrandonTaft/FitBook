import { NavLink } from "react-router-dom";
import Post from "./Post";
import { addPostPopup } from "../utils/utils";
import { RiLogoutBoxFill, RiMoonClearFill, RiSunFill, RiDraftFill, RiDiscussFill, RiHomeSmileFill } from "react-icons/ri";
import Avatar from 'react-avatar';
import "./App.css"

function Navbar({ theme, switchTheme }) {
    const profilePic = localStorage.getItem('profile_pic')
    const name = localStorage.getItem('name')
    return (
        <nav className="navBar">
            {theme === 'light'
                ?
                <RiMoonClearFill className='nav-icon highlight' onClick={switchTheme} />
                :
                <RiSunFill className='nav-icon highlight' onClick={switchTheme} />
            }
            <NavLink to="/logout" >
                <RiLogoutBoxFill className="nav-icon highlight" />
            </NavLink>
            <NavLink to="/feed">
                <RiHomeSmileFill className='nav-icon home-icon icon highlight' />
            </NavLink>
            <NavLink to="/messages">
                <RiDiscussFill className='nav-icon message-icon icon highlight' />
            </NavLink>
            <RiDraftFill className='nav-icon icon highlight' onClick={addPostPopup} />
            {profilePic === 'invalid'
                ?
                <NavLink to="/profile">
                    <Avatar
                        name={name}
                        color="blue"
                        className="rounded mt-3"
                        size={50} textSizeRatio={2}
                        maxInitials={2}
                    />
                </NavLink>
                :
                <NavLink to="/profile">
                    <Avatar
                        src={profilePic}
                        className="rounded mt-3"
                        size={50}
                    />
                </NavLink>
            }
            <div id="add-post" className="add-post ">
                <Post />
            </div>
        </nav>
    )
}

export default Navbar