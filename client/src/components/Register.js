import React, { useState } from 'react'
import  "./App.css"


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

        <div id="page">
        <div id="logo-container">
        <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" />
      </div>
        <div id="log_RegBox">
            <h1 className=" log_RegTitle">Register</h1>
            {message && <p>{message}</p>}
            <input className="log_RegTextbox" type="text" name="name" onChange={handleRegisterChange} placeholder=" Enter Desired User name"  /><br></br>
            <input className="log_RegTextbox" type="password" name="password" onChange={handleRegisterChange} placeholder="Enter Desired Password" /><br></br>
            <button className="log_RegButton" onClick={handleRegisterButton}>Submit</button>

        </div>
        </div>
    )
}

export default Register


