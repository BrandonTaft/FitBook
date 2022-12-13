import React, { useState } from 'react';

import "./App.css"



function SendMessage(props) {

    const [message, setMessage] = useState({})

    const handleSendMessage = (e) => {
        setMessage({

            ...message,
            contact: (localStorage.getItem('name')),
            [e.target.name]: e.target.value

        })
    }



    const postTODB = () => {
        fetch("http://127.0.0.1:8080/api/addmail", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.history.push('/Messages')
                }
            })
    }

    return (
        <div>
            
            <h1>Send Message</h1>
            <input className="textbox" type="text" name="priority" onChange={handleSendMessage} placeholder="Send Mail To:" /><br></br>
            <input className="textbox" type="text" name="name" onChange={handleSendMessage} placeholder="Title" /><br></br>
            <input className="textbox" type="url" name="link" onChange={handleSendMessage} placeholder="Link" /><br></br>
            <input className="textbox" type="tel" name="contactNumber" onChange={handleSendMessage} placeholder="Contact Number" /><br></br>
            <textarea id='description' className="textbox" type="text" name="description" onChange={handleSendMessage} placeholder="Description" /><br></br>
            <button className="billButton" onClick={postTODB}>Send Message</button>
        </div>
    )


}



export default SendMessage