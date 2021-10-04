import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu'



function AddThings(props) {

    const [thing, setThing] = useState({})

    const handleAddThing = (e) => {
        setThing({

            ...thing,
            userId: parseInt(localStorage.getItem('user_Id')),
            userName:(localStorage.getItem('name')),
            [e.target.name]: e.target.value

        })
    }



    const postTODB = () => {
        fetch("http://localhost:8080/api/addpublicthings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(thing)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    
                    props.history.push('/allthings')

                }
            })
    }
    return (
        <div>
        <Menu />
        <div id="boxes">
            <h1>ADD YOUR THING </h1>
            <input className="textbox" type="text" name="name" onChange={handleAddThing} placeholder="Name Your Thing" /><br></br>
            <input className="textbox" type="text" name="duedate" onChange={handleAddThing} placeholder="DueDate" /><br></br>
            <input className="textbox" type="url" name="priority" onChange={handleAddThing} placeholder="Profile Picture" /><br></br>
            <input className="textbox" type="url" name="link" onChange={handleAddThing} placeholder="Link" /><br></br>
            <input className="textbox" type="text" name="contact" onChange={handleAddThing} placeholder="Contact Name" /><br></br>
            <input className="textbox" type="tel" name="contactNumber" onChange={handleAddThing} placeholder="Contact Number" /><br></br>
            <textarea id='description' className="textbox" type="text" name="description" onChange={handleAddThing} placeholder="Description" /><br></br>
            <button className="button" onClick={postTODB}>Add Thing</button>
        </div>
        </div>
    )


}

export default AddThings