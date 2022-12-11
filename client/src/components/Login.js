import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../assets/logo-aqua.png"
import "./App.css"


function Login(props) {


    const [credentials, setCredentials] = useState({})
    const [message, setMessage] = useState('')


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
                    const token = result.token
                    localStorage.setItem('jsonwebtoken', token)
                    localStorage.setItem('user_Id', result.user_id)
                    localStorage.setItem('name', result.name)
                    localStorage.setItem('title', result.title)
                    localStorage.setItem('bio', result.bio)
                    props.history.push('/publicfeed')

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
            <input className="textbox mb-2" type="password" name="password" onChange={handleLoginChange} placeholder="Password" />
            {message && <p className="warning" >{message}</p>}
            <button className="btn mb-1" onClick={handleLogin}>LOGIN</button>
            <NavLink to="/register" className='mb-2'> <button className="btn">REGISTER</button></NavLink>
            </div>
        </div>
    )
}


export default Login