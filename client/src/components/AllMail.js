
import { useEffect } from 'react'
import './App.css'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import Menu from './Menu'
import Navbar from './Navbar'
import './allThings.css'

function AllMail(props) {

    useEffect(() => {
        props.onMailLoaded()
      }, [])
  
      
      const handleMailDelete = (mail) => {
          fetch(`https://lit-ravine-06265.herokuapp.com/api/deletemail/${mail.id}`, {
            method: 'DELETE'
          }).then(response => response.json())
          .then(result => { 
            props.onMailLoaded()
           
          })
      }



    const mailItems = props.mail.map(mail=> {
        return <ul key={mail.id} id = "mailList">
            <h1>Title: {mail.name}</h1>
            
            
            <a rel={'external'} target="_blank" href={`${mail.link}`}>Pay Bill</a>
            <h3>{mail.contact}</h3>
          
            <a href="tel:{mail.contactNumber}">{mail.contactNumber}</a>
            <p>Description: {mail.description}</p>
            <button className="button" onClick={() => handleMailDelete(mail)}>Delete</button>
        </ul>

    })

        return (
      
          <div>
          <Navbar />
          <Menu />
          <div><NavLink to="/addmail" className='inactive' >SEND MAIL</NavLink></div>
           
            {mailItems}
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
 
 
 export default connect(mapStateToProps, mapDispatchToProps)(AllMail);
 

