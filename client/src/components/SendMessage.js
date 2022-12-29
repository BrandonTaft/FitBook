import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import "./App.css"



function SendMessage({sendTo, setShowDmPopup}) {

    const [message, setMessage] = useState({})

    const handleSendMessage = (e) => {
        setMessage({

            ...message,
            sendTo: sendTo.name,
            sender: (localStorage.getItem('name')),
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
                    setShowDmPopup(false)
                }
            })
    }

    return (
        <div className='dm-popup'>
            <MdClose className='comment-close' onClick={() => {setShowDmPopup(false)}} />
            {sendTo
                ?
            <h1>Send Message to {sendTo.name}</h1>
                :
                ""
            }
            <input className="textbox" type="text" name="name" onChange={handleSendMessage} placeholder="Title" /><br></br>
            <input className="textbox" type="url" name="link" onChange={handleSendMessage} placeholder="Link" /><br></br>
            <input className="textbox" type="tel" name="contactNumber" onChange={handleSendMessage} placeholder="Contact Number" /><br></br>
            <textarea id='description' className="textbox" type="text" name="description" onChange={handleSendMessage} placeholder="Description" /><br></br>
            <button className="billButton" onClick={postTODB}>Send Message</button>
        </div>
    )


}



export default SendMessage