import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';
import Chat from './Chat/Chat';
import { SendMessage } from './SendMessage';
import { sendMailPopup } from '../utils/utils';
import { RiMailAddLine } from "react-icons/ri";
import { MdClose } from "react-icons/md";
import "./App.css";


function Messages(props) {
  useEffect(() => {
    props.onMailLoaded()
  }, []);
  
  const handleMessageDelete = (mail) => {
    fetch(`http://127.0.0.1:8080/api/deletemail/${mail.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        props.onMailLoaded()

      })
  }

  const messageItems = props.mail.map(mail => {
    return <div key={mail.id} >
      <div className="yellow comment-image">
        <span className="highlight">{mail.name}</span>
      </div>
      <div className='message'>{mail.message}
        <button className="deleteButton" onClick={() => handleMessageDelete(mail)}>Delete</button>
      </div>
    </div>
  })

  return (
    <div className='messages'>
      < RiMailAddLine className='mail-icon highlight' onClick={ sendMailPopup }/>
      <div id="mail-form" className='mail-form'>
        <SendMessage />
      </div>
      {messageItems}
      <Chat />
    </div>
  )

}
// export default Messages;

const mapDispatchToProps = (dispatch) => {
  return {
    onMailLoaded: () => dispatch(actionCreators.fetchMail())
  }
}

const mapStateToProps = (state) => {
  return {
    mail: state.mail
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Messages)


