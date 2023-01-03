import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';
import Chat from './Chat/Chat';
import { clearBoxes } from '../utils/utils';
import AutoCompleteForm from './AutoCompleteForm';
import { RiMailAddLine } from "react-icons/ri";
import "./App.css";


function Messages(props) {
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    props.onMailLoaded()
  }, []);

  function sendMailPopup() {
    clearBoxes()
    document.getElementById('mail-form').classList.toggle('show-mail-form')
    setShowList(false)
  }
  
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
        <AutoCompleteForm showList = {showList} setShowList={setShowList} />
      </div>
      {messageItems}
      <Chat />
    </div>
  )

}

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


