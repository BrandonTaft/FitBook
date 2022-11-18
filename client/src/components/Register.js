import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./App.css"


function Register(props) {

    const [user, setUser] = useState({})
    const [message, setMessage] = useState('')
    const handleRegisterChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    const handleRegisterButton = () => {
        fetch('https://lit-ravine-06265.herokuapp.com/api/register', {
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
            <div className="mb-2">
                <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" height={150} width={250} />
            </div>
            <h2>REGISTER</h2>
            {message && <p>{message}</p>}
            <input className="textbox" type="text" name="name" onChange={handleRegisterChange} placeholder=" Enter Desired User name" />
            <input className="textbox mb-2" type="password" name="password" onChange={handleRegisterChange} placeholder="Enter Desired Password" />
            <input className="textbox" type="text" name="title" onChange={handleRegisterChange} placeholder=" Enter Professional Title" />
            <input className="textbox mb-2" type="text" name="bio" onChange={handleRegisterChange} placeholder="Enter Bio" />
            <button className="btn mb-1" onClick={handleRegisterButton}>SUBMIT</button>
            <NavLink to="/" className='white'>Back To Login</NavLink>
        </div>
    )
}

export default Register


