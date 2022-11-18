import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
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
        fetch('https://lit-ravine-06265.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)

        }).then(response => response.json())
            .then(result => {
                if (result.success == true) {
                    console.log("result", result.user_id)
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
            <div className="mb-2">
                <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" height={150} width={250} />
            </div>
            <h2>LOGIN</h2>
            <input className="textbox" type="text" name="name" onChange={handleLoginChange} placeholder="User name" />
            <input className="textbox mb-2" type="password" name="password" onChange={handleLoginChange} placeholder="Password" />
            {message && <p className="error-message" >{message}</p>}
            <button className="btn mb-1" onClick={handleLogin}>LOGIN</button>
            <NavLink to="/register" className='mb-2'> <button className="btn">REGISTER</button></NavLink>
        </div>
    )
}


export default Login