import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import Navbar from './Navbar'
import  "./App.css"


function Messages(props) {

    useEffect(() => {
        props.onMailLoaded()
      }, [])
  
      
      const handleMessageDelete = (mail) => {
          fetch(`http://127.0.0.1:8080/api/deletemail/${mail.id}`, {
            method: 'DELETE'
          }).then(response => response.json())
          .then(result => { 
            props.onMailLoaded()
           
          })
      }

    const messageItems = props.mail.map(mail=> {
      if(mail.link != null)
        return <ul key={mail.id} id = "thingList">
  
            <a rel={'external'} href={`${mail.link}` } className="thingTitle">{mail.name}</a>
            <h3> Sender: {mail.contact}</h3>
          
           
            <p> {mail.description}</p>
            <button className="deleteButton" onClick={() => handleMessageDelete(mail)}>Delete</button>
        </ul>
      else{return <ul key={mail.id} id = "mailList">
  
      <a rel={'external'} href={`${""}` } className="thingTitle">{mail.name}</a>
      <h3> From: {mail.contact}</h3>
    
     
      <p>Description: {mail.description}</p>
      <button className="deleteButton" onClick={() => handleMessageDelete(mail)}>Delete</button>
  </ul>}
    })

        return (
          <div className='flex-column full-page'>
          <Navbar />
          <NavLink to="/sendmessage" className='postButton' >Send Message</NavLink>
            {messageItems}
        </div>

    )

}
const mapDispatchToProps = (dispatch) => {
    return {
      onMailLoaded: () => dispatch(actionCreators.fetchMyMail())
    }
  }
 
 const mapStateToProps = (state) => {
   return {
     mail: state.mail 
   }
 }
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(Messages);
 

