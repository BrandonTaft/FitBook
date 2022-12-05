import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import  "./App.css"


function Messages(props) {
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
  
      console.log("MAIL", message )
      const handleMessageDelete = (mail) => {
          fetch(`http://127.0.0.1:8080/api/deletemail/${mail.id}`, {
            method: 'DELETE'
          }).then(response => response.json())
          .then(result => { 
            props.onMailLoaded()
           
          })
      }

    const messageItems = message.map(mail=> {
        return <div key={mail.id} >
          <div className="yellow comment-image">
            <span className="spare">{mail.contact}</span>
          </div>
          <div className='comment message'>{mail.description}
            <button className="deleteButton" onClick={() => handleMessageDelete(mail)}>Delete</button>
            </div>
        </div>
    })

        return (
          <div className='my-posts'>
            {messageItems}
        </div>

    )

}
 export default Messages;
 

