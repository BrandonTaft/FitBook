
import './login.css';
import React, { useState } from 'react';
import { NavLink } from "react-router-dom";


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
        fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)

        }).then(response => response.json())
            .then(result => {
                if (result.success == true) {
                    console.log(result)
                    //Get Token And Put It In Local Storage
                    const token = result.token
                    localStorage.setItem('jsonwebtoken', token)
                    localStorage.setItem('user_Id', result.user_id)
                    localStorage.setItem('name', result.name)
                    props.history.push('/allthings')

                }
                else {
                    setMessage(result.message)
                }
            })
    }


    return (
        <div id="log_RegBox">
            <h1 className=" log_RegTitle">Login</h1>
            <input className="log_RegTextbox" type="text" name="name" onChange={handleLoginChange} placeholder="User name" /><br></br>
            <input className="log_RegTextbox" type="password" name="password" onChange={handleLoginChange} placeholder="Password" /><br></br>
            {message && <p className="message" >{message}</p>}
            <button className="log_RegButton" onClick={handleLoginButton}>Login</button><br></br>
            Not A Member Yet?<NavLink to="/register"className='regLink'>Register Here</NavLink>
        </div>
    )
}


export default Login