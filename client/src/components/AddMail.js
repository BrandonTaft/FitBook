import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './Menu';
import Navbar from './Navbar';



function AddMail(props) {

    const [mail, setMail] = useState({})

    const handleAddMail = (e) => {
        setMail({
           
            ...mail,
             [e.target.name]: e.target.value
             
        })
    }

   
        
    const postTODB = () => {
        fetch("http://localhost:8080/api/addmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mail)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.history.push('/AllMail')
                }
            })
    }     

    return (
        <div id="boxes">
            <Menu />
            <Navbar />
        <h1>NEW MAIL</h1>
        <input className="textbox" type="text" name="priority" onChange={handleAddMail} placeholder="Send Mail To:" /><br></br>
        <input className="textbox" type="text" name="name" onChange={handleAddMail} placeholder="Name Your Thing" /><br></br>
       
        
        <input className="textbox" type="url" name="link" onChange={handleAddMail} placeholder="Link" /><br></br>
        <input className="textbox" type="text" name="contact" onChange={handleAddMail} placeholder="Contact Name" /><br></br>
        <input className="textbox" type="tel" name="contactNumber" onChange={handleAddMail} placeholder="Contact Number" /><br></br>
        <textarea id='description' className="textbox" type="text" name="description" onChange={handleAddMail} placeholder="Description" /><br></br>
        <button className="button" onClick={postTODB}>Add Thing</button>
    </div>
        )
    

}



export default AddMail