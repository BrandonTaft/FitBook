import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import logo from "../assets/logo-aqua.png";
import google from "../assets/google.png";
import facebook from "../assets/fb.png"
import "./App.css";


function Login(props) {
    const [credentials, setCredentials] = useState({});
    const [message, setMessage] = useState('');
    const handleLoginChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = () => {
        fetch('https://fitbook-brandontaft.vercel.app/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    Cookies.set('token', result.token)
                    Cookies.set('name', result.user.name)
                    Cookies.set('user_Id', result.user.id)
                    Cookies.set('profile_pic', result.user.profile_pic)
                    props.history.push('/feed')
                }
                else {
                    setMessage(result.message)
                }
            })
    }

    return (
        <div className="full-page flex-column">
            <div className='login-container flex-column'>
                <div className="mb-1">
                    <img src={logo} alt="logo" height={135} width={180} />
                </div>
                <h3 className='text m-0'>LOGIN</h3>
                <input className="textbox" type="text" name="name" onChange={handleLoginChange} placeholder="User name" />
                <input className="textbox" type="password" name="password" onChange={handleLoginChange} placeholder="Password" />
                <div className="warning auth-error">
                    {message && <span>{message}</span>}
                </div>
                <button className="btn mb-1" onClick={handleLogin}>LOGIN</button>
                <NavLink to="/register" className='mb-0'> <button className="btn">REGISTER</button></NavLink>
                <div className='or-container'>
                    <span className='sm-divider text'></span>
                    <span className='text or'>or</span>
                    <span className='sm-divider text'></span>
                </div>
                <a className="sm-button mb-1" href="httpss://fitbook-self.vercel.app/auth/google">
                    <img className="sm-icon" alt='google-logo' src={google} />
                    <span className="sm-button-text">Sign in with Google</span>
                </a>
                <a className="sm-button facebook" href="httpss://fitbook-self.vercel.app/auth/facebook">
                    <img className="sm-icon facebook" alt='facebook-logo' src={facebook} />
                    <span className="sm-button-text">Sign in with FaceBook</span>
                </a>
                <p className="login-copyright copyright">
                    Copyright &copy; {new Date().getFullYear()} Brandon Taft
                </p>
            </div>
        </div>
    )
}


export default Login