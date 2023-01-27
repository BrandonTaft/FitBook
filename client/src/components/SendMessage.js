import React, { useState } from 'react';
import { MdClose } from "react-icons/md";
import "./App.css"

export function SendAutoMessage({ sendTo, setShowDmPopup }) {
    const [message, setMessage] = useState({});
    const handleSendMessage = (e) => {
        setMessage({
            ...message,
            sendTo: sendTo.name,
            sender: (localStorage.getItem('name')),
            [e.target.name]: e.target.value
        })

    }

    const postTODB = () => {
        fetch("/api/addmail", {
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
        <div className='user dm-popup'>
            <MdClose className='add-post-close' onClick={() => { setShowDmPopup(false) }} />
            <h2>Send Message to {sendTo.name}</h2>
            <textarea className="textbox" type="text" name="message" onChange={handleSendMessage} placeholder="Message" /><br></br>
            <button className="billButton" onClick={postTODB}>Send Message</button>
        </div>
    )
}