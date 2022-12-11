import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-aqua.png"
import "./App.css"


function Register(props) {

    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const handleRegisterChange = (e) => {
        setUser({
            ...user,
            bio: false,
            [e.target.name]: e.target.value
        })
    }
    const handleRegisterButton = () => {
        fetch('http://127.0.0.1:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.history.push('/')
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
            <h2>REGISTER</h2>
            {message && <p>{message}</p>}
            <input className="textbox" type="text" name="name" onChange={handleRegisterChange} placeholder=" Enter Desired User name" />
            <input className="textbox mb-2" type="password" name="password" onChange={handleRegisterChange} placeholder="Enter Desired Password" />
            <input className="textbox" type="text" name="title" onChange={handleRegisterChange} placeholder=" Enter Professional Title" />
            <button className="btn mb-1" onClick={handleRegisterButton}>SUBMIT</button>
            <NavLink to="/" className='highlight'>Back To Login</NavLink>
            </div>
        </div>
    )
}

export default Register


