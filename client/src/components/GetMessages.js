import React, { useState, useEffect } from 'react';
import Messages from './Messages';
import  "./App.css"


function GetMessages() {

  const [message, setMessage] = useState([])

  useEffect(() => { getMessages() }, [])

  const getMessages = () => {
    const name = localStorage.getItem('name')
    fetch(`http://127.0.0.1:8080/api/getmail/${name}`)
      .then(response => response.json())
      .then(message => {
        console.log(message)
        setMessage(message)
      })
  }



  return (
    <div>
      <Messages message={message} />
    </div>
  )

}


export default GetMessages