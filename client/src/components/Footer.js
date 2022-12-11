import { NavLink, useLocation } from "react-router-dom";
import Avatar from "react-avatar";
import github from "../assets/github.png";
import gmail from "../assets/gmail.png";
import huge from "../assets/huge.png";
import linked from "../assets/linked.png";
import logo from "../assets/logo-aqua.png";

function Footer() {
    return (
        <>
            <svg className="wave" preserveAspectRatio="xMinYMin meet" x="0px" y="0px" viewBox="0 0 1920 81.717" >
                    <path
                        d="M1920,0c0,0-109.246,46.107-316.333,67.334C1343.5,94,1137.095,77.238,999.167,67.5C854,57.25,637.662,24.697,541.709,18.834C375.334,8.666,147,11,0,37.875V0H1920L1920,0z">
                    </path>
                </svg>
            <div className="footer" >
                <img src={logo} alt="logo" height={90} width={120} />
                <div className="highlight ta-center mt-5">
                    <span className="text-secondary navigate">
                        Navigate
                    </span>
                    <div className="highlight links ta-left">
                        <NavLink className="link" to="/messages">Messages</NavLink>
                        <NavLink className="link" to="/profile">Profile</NavLink>
                        <NavLink className="link" to="/post">Create Post</NavLink>
                        <a className="link" href="/sitemap.xml">
                            <span > Sitemap </span>
                        </a>
                    </div>
                </div>
                <div className='text-secondary socials'>
                    <div>
                        <a href="https://github.com/BrandonTaft" target="_blank" rel="noreferrer">
                            <img src={github} alt="github" width={30} height={30} />
                        </a>
                        <a href="https://www.brandontaft.net/" target="_blank" rel="noreferrer">
                            <img src={huge} alt="logo" width={30} height={30} />
                        </a>
                        <a href="https://www.linkedin.com/in/brandonmtaft/" target="_blank" rel="noreferrer">
                            <img src={linked} alt="linkedIn-logo" width={30} height={30} />
                        </a>
                        <a href="mailto:btaftcan@gmail.com" >
                            <img src={gmail} alt="gmail-logo" width={40} height={30} />
                        </a>
                    </div>
                        <p className="copyright">
                           Made By Brandon Taft &nbsp;
                            &copy;{new Date().getFullYear()}
                        </p>          
                </div>
            </div>
        </>
    )
}

export default Footer