import React, { useState, useEffect } from 'react';
import Messages from './Messages';
import  "./App.css"


function GetMessages() {

  const [message, setMessage] = useState([])

  useEffect(() => { getMessages() }, [])

  const getMessages = () => {
    const name = localStorage.getItem('name')
    fetch(`https://lit-ravine-06265.herokuapp.com/api/getmail/${name}`)
      .then(response => response.json())
      .then(message => {
        console.log(message)
        setMail(message)
      })
  }



  return (
    <div>
      <Messages message={message} />

    </div>
  )

}


export default GetMessages