import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import history from "../store/History";
import { MdClose } from "react-icons/md";
import { sendMailPopup } from '../utils/utils';
import "./App.css"

function AutoCompleteForm({ showList, setShowList }) {
    const [message, setMessage] = useState({});
    const [userNames, setUserNames] = useState([]);
    const count = useRef(0);
    const nameInput = document.getElementById("sendTo");

    useEffect(() => {
        getAllUsernames()
        !showList ? count.current = 0 : count.current = count.current
        const temp = document.getElementById('auto-complete')
        temp.classList.add('temp')
    }, [showList])

    const getAllUsernames = () => {
        const token = Cookies.get('token')
        fetch('http://127.0.0.1:8080/api/all-usernames', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(usernames => {
                if (usernames.success === false) {
                    history.push('/')
                } else {
                    setUserNames(usernames)
                }
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
                    clearAll()
                }
            })
    }

    //********  AUTOCOMPLETE  ********/

    // Reset Everything
    const clearAll = () => {
        setShowList(false)
        sendMailPopup()
        count.current = 0;
    }

    //Opens dropdown when text is entered in the send to field
    //Sets message data in to the message state
    //If letter is deleted it moves the highlight back to top of list
    function handleMessage(e) {
        e.target.name === 'sendTo' && e.target.value.length ? setShowList(true) : setShowList(false)
        setMessage({
            ...message,
            sender: (localStorage.getItem('name')),
            [e.target.name]: e.target.value
        })
        count.current = 0
        const userList = document.getElementById('user-list');
        if (userList) {
            let x = userList.children[count.current]
            if (x) {
                x.classList.add('auto-complete-active')
            }
        }
    }

    //If name is clicked on it sets that name as send to in message state
    //Closes the list once name is clicked on
    function setSearchValue(e) {
        setMessage({ ...message, sendTo: e.target.innerHTML })
        nameInput.value = e.target.innerHTML
        setShowList(false)
    }

    //Key press Handler
    const handleArrowKeys = (e) => {
        const userList = document.getElementById('user-list');
        const temp = document.getElementById('auto-complete')
        if (userList) {
            //When down arrow is pressed it moves highlight down 1 in the list
            if (e.keyCode === 40 && count.current < userList.children.length - 1) {
                temp.classList.remove('temp')
                count.current = count.current + 1
                const userList = document.getElementById('user-list');
                let x = userList.children[count.current]
                let y = userList.children[count.current - 1]
                if (x) {
                    x.classList.add('auto-complete-active')
                }
                if (y) {
                    y.classList.remove('auto-complete-active')
                }
            }
            //When up arrow is pressed it moves highlight up 1 in the list
            if (e.keyCode === 38 && count.current > 0) {
                count.current = count.current - 1
                const userList = document.getElementById('user-list');
                let x = userList.children[count.current]
                let y = userList.children[count.current + 1]
                if (x) {
                    x.classList.add('auto-complete-active')
                }
                if (y) {
                    y.classList.remove('auto-complete-active')
                }
            }
            //When enter key is pressed on a name it sets that name in send to property of message state
            //While making that name the value of the input box, closing the list, and resetting the key counter count
            if (e.keyCode === 13 && count.current >= 0) {
                const chosenName = document.getElementById('user-list').children[count.current];
                setMessage({
                    ...message,
                    sendTo: chosenName.innerHTML
                })
                nameInput.value = chosenName.innerHTML
                setShowList(false)
                count.current = 0
            }
            //When delete is pressed it resets the count which brings the highlight back to the top
            //While taking the highlight back to top by resetting count and clearing the active class
            if (e.keyCode === 8) {
                count.current = 0
                for (let i = 0; i < userList.children.length; i++) {
                    userList.children[i].classList.remove('auto-complete-active')
                }
            }
        }
    }

    const userSearch = userNames.map((username, index) => {
        if (showList) {
            let nameMatch;
            if (username.substr(0, message.sendTo.length).toUpperCase() === message.sendTo.toUpperCase()) {
                nameMatch = <div key={index} className="user-list-item ellipses m-5" onClick={setSearchValue}>{username}</div>
            } else {
                nameMatch = ""
            }
            return (
                nameMatch
            )
        }
    })

    return (
        <div id="auto-complete" className='auto-complete dm-popup temp'>
            <MdClose className='add-post-close' onClick={clearAll} />
            <div className='auto-complete-container'>
                <input id="sendTo" className="" type="text" name="sendTo" onChange={handleMessage} onKeyDown={handleArrowKeys} placeholder="Send To" autoComplete='off' />
                {showList
                    ?
                    <div id="user-list" className='user-list ellipses list'>
                        {userSearch}
                    </div>
                    :
                    ""
                }
            </div>
            <textarea id="message-input" className="textbox" type="text" name="message" onChange={handleMessage} onClick={() => { setShowList(false) }} placeholder="Message" /><br></br>
            <button className="billButton" onClick={postTODB}>Send Message</button>
        </div>
    )
}

export default AutoCompleteForm