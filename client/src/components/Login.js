import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import Cookies from 'js-cookie';
import logo from "../assets/logo-aqua.png";
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
        fetch('http://127.0.0.1:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        }).then(response => response.json())
            .then(result => {
                if (result.success == true) {
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
                <div className="mb-2">
                    <img src={logo} alt="logo" height={150} width={250} />
                </div>
                <h2>LOGIN</h2>
                <input className="textbox" type="text" name="name" onChange={handleLoginChange} placeholder="User name" />
                <input className="textbox" type="password" name="password" onChange={handleLoginChange} placeholder="Password" />
                <div className="warning auth-error">
                    {message && <span>{message}</span>}
                </div>
                <a href="http://127.0.0.1:8080/auth/google">google</a>
                <button className="btn mb-1" onClick={handleLogin}>LOGIN</button>
                <NavLink to="/register" className='mb-1'> <button className="btn">REGISTER</button></NavLink>
            </div>
        </div>
    )
}


export default Login