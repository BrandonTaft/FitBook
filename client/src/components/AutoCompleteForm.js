import React, { useState, useEffect } from 'react';
import { MdClose } from "react-icons/md";
import { sendMailPopup } from '../utils/utils';
import "./App.css"

function AutoCompleteForm() {
    const [message, setMessage] = useState({});
    const [userNames, setUserNames] = useState([]);
    const [showList, setShowList] = useState(false);
    const nameInput = document.getElementById("sendTo");

    useEffect(() => {
        getAllUsernames()
    }, [])

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
                    setShowList(false)
                    sendMailPopup()
                }
            })
    }

    //********  AUTOCOMPLETE  ********/

    const removeList = () => {
        setShowList(false)
    }

    const clearAll = () => {
        removeList()
        sendMailPopup()
    }

    const handleSendTo = (e) => {
        { e.target.value.length ? setShowList(true) : setShowList(false) }
        setMessage({
            ...message,
            sender: (localStorage.getItem('name')),
            [e.target.name]: e.target.value
        })
    }

    const handleMessage = (e) => {
        setMessage({
            ...message,
            [e.target.name]: e.target.value
        })
    }

    function setSearchValue(e) {
        setMessage({ ...message, sendTo: e.target.innerHTML })
        nameInput.value = e.target.innerHTML
        setShowList(false)
    }

    const userSearch = userNames.map((username, index) => {
        if (showList) {
            let nameMatch;
            if (username.substr(0, message.sendTo.length).toUpperCase() == message.sendTo.toUpperCase()) {
                nameMatch = <div key={index} className="search-name ellipses m-5" onClick={setSearchValue}>{username}</div>
            } else {
                nameMatch = ""
            }
            return (
                nameMatch
            )
        }
    })

    return (
        <div className='dm-popup'>
            <MdClose className='add-post-close' onClick={clearAll} />
            <input id="sendTo" className="textbox" type="text" name="sendTo" onChange={handleSendTo} placeholder="Send To" />
            {showList
                ?
                <div id="user-list" className='user-search ellipses'>
                    {userSearch}
                </div>
                :
                ""
            }
            <textarea id="message-input" className="textbox" type="text" name="message" onChange={handleMessage} onClick={removeList} placeholder="Message" /><br></br>
            <button className="billButton" onClick={postTODB}>Send Message</button>
        </div>
    )
}

export default AutoCompleteForm