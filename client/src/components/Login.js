import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import  "./App.css"


function Login(props) {


    const [credentials, setCredentials] = useState({})
    const [message, setMessage] = useState('')


    const handleLoginChange = (e) => {
        setCredentials({

            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handleLoginButton = () => {
        fetch('https://lit-ravine-06265.herokuapp.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)

        }).then(response => response.json())
            .then(result => {
                if (result.success == true) {
                    console.log("result",result.user_id)
                    const token = result.token
                    localStorage.setItem('jsonwebtoken', token)
                    localStorage.setItem('user_Id', result.user_id)
                    localStorage.setItem('name', result.name)
                    props.history.push('/publicfeed')

                }
                else {
                    setMessage(result.message)
                }
            })
    }


    return (
        <div id="page">
        <div id="logo-container">
        <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" />
      </div>
        <div id="log_RegBox">
            <h1 className=" log_RegTitle">Login</h1>
            <input className="log_RegTextbox" type="text" name="name" onChange={handleLoginChange} placeholder="User name" /><br></br>
            <input className="log_RegTextbox" type="password" name="password" onChange={handleLoginChange} placeholder="Password" /><br></br>
            {message && <p className="message" >{message}</p>}
            <button className="log_RegButton" onClick={handleLoginButton}>Login</button><br></br>
           <NavLink to="/register"className='regLink'>Register Here</NavLink>
        </div>
        </div>
    )
}


export default Login