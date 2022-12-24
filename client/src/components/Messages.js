import { useEffect, useState } from 'react';
import Chat from './Chat/Chat';
import SendMessage from './SendMessage';
import { sendMailPopup } from '../utils/utils';
import { RiMailAddLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import "./App.css"


function Messages(props) {
  const [message, setMessage] = useState([])
  useEffect(() => { getMessages() }, [])

  const getMessages = () => {
    const name = localStorage.getItem('name')
    fetch(`http://127.0.0.1:8080/api/getmail/${name}`)
      .then(response => response.json())
      .then(message => {
        setMessage(message)
      })
  }

  const handleMessageDelete = (mail) => {
    fetch(`http://127.0.0.1:8080/api/deletemail/${mail.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        props.onMailLoaded()

      })
  }

  const messageItems = message.map(mail => {
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
    <div className='messages'>
      < RiMailAddLine className='mail-icon highlight' onClick={ sendMailPopup }/>
      <div id="mail-form" className='mail-form'>
        <MdClose className='add-post-close' onClick={ sendMailPopup } />
        <SendMessage />
      </div>
      {messageItems}
      <Chat />
    </div>

  )

}
export default Messages;


