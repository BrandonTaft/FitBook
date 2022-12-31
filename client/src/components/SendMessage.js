import React, { useState, useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { sendMailPopup } from '../utils/utils';
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
            <MdClose className='add-post-close' onClick={() => { setShowDmPopup(false) }} />
            <h2>Send Message to {sendTo.name}</h2>
            <textarea className="textbox" type="text" name="message" onChange={handleSendMessage} placeholder="Message" /><br></br>
            <button className="billButton" onClick={postTODB}>Send Message</button>
        </div>
    )
}




export function SendMessage({ setShowDmPopup }) {
    const [message, setMessage] = useState({});
    const [userNames, setUserNames] = useState([]);

    useEffect(() => {
        getAllUsernames()
    }, [])


    const handleSendMessage = (e) => {
        setMessage({
            ...message,
            sender: (localStorage.getItem('name')),
            [e.target.name]: e.target.value
        })
    }

    const getAllUsernames = () => {
        const token = localStorage.getItem('token')
        fetch('http://127.0.0.1:8080/api/all-usernames', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(usernames => {
                setUserNames(usernames)
            })
    }
    
    const nameInput = document.getElementById("sendTo");
    const messageInput = document.getElementById("message-input");
    const userList = document.getElementById("user-list");
    const showNames = (e) => {
       userList.classList.toggle("hide-user-list")
    }

    function setSearchValue(e, username) {
        setMessage({...message, sendTo: e.target.innerHTML})
        nameInput.value = e.target.innerHTML
        userList.classList.toggle("hide-user-list")
    }
   
    const userSearch = userNames.map((username, index) => {
        let searchName = message
       console.log(message.sendTo)
        return(
            <button key={index} onClick={setSearchValue}>{username}</button>
        )
         
    })
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
                    nameInput.value = ""
                    messageInput.value = ""
                   sendMailPopup()
                }
            })
    }

    return (
        <div className='dm-popup'>
            <MdClose className='add-post-close' onClick={sendMailPopup} />
            <input id="sendTo" className="textbox" type="text" name="sendTo" onChange={handleSendMessage} onClick={showNames} placeholder="Send To" />
            <div id="user-list" className='user-search hide-user-list'>
                {userSearch}
            </div>
            <textarea id="message-input" className="textbox" type="text" name="message" onChange={handleSendMessage} placeholder="Message" /><br></br>
            <button className="billButton" onClick={postTODB}>Send Message</button>
        </div>
    )
}