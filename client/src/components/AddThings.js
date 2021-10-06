import React, { useState} from 'react';
import './App.css';
import Menu from './Menu'
import Navbar from './Navbar'



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
        fetch("https://lit-ravine-06265.herokuapp.com/api/addpublicthings", {
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
        <Navbar />
        <Menu />
        <div id="addBoxes">
            <h1>ADD NEW WORKOUT </h1>
            <h2>Everyone Will See This</h2>
            <input className="textbox" type="text" name="name" onChange={handleAddThing} placeholder="Name Your Workout" />
            <input className="textbox" type="text" name="duedate" onChange={handleAddThing} placeholder="DueDate" />
            {/* <input className="textbox" type="image" name="priority" onChange={handleAddThing} placeholder="Profile Picture" /><br></br> */}
            <input className="textbox" type="url" name="link" onChange={handleAddThing} placeholder="Link" />
            <input className="textbox" type="text" name="contact" onChange={handleAddThing} placeholder="Contact Name" />
            <input className="textbox" type="tel" name="contactNumber" onChange={handleAddThing} placeholder="Contact Number" />
            <textarea id='description' className="textbox" type="text" name="description" onChange={handleAddThing} placeholder="Description" /><br></br>
            <button className="button" onClick={postTODB}>Add Workout</button>
        </div>
        </div>
    )


}

export default AddThings