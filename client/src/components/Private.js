import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';
import Navbar from './Navbar';
import Avatar from 'react-avatar';
import { NavLink } from 'react-router-dom'
import "./App.css"


function Private(props) {
  const [user, setUser] = useState()
  useEffect(() => {
    props.onThingsLoaded()
    getUser()
  }, [])

  const getUser = () => {
    const id = localStorage.getItem('user_Id')
    fetch(`https://lit-ravine-06265.herokuapp.com/api/users${id}`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(user => {
            console.log(user)
            setUser(user)
        })
    }

  const handlePrivateDelete = (thing) => {
    fetch(`https://lit-ravine-06265.herokuapp.com/api/mythings/${thing.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        props.onThingsLoaded()
      })
  }

  const thingItems = props.things.map(thing => {
    const randomNumber = Math.floor(Math.random() * 14) + 1;
    const name = localStorage.getItem('name')
    return (
      <div key={thing.id} id='listContainer'>
        <div id="picBox">
          <div className="fill">
          <Avatar src={`https://i.pravatar.cc/150?img=${thing.id - 98}`} round={true} size={150} />
          </div>
          <div id='nameBox'>
            {name}
          </div>
        </div>
        <div key={thing.id} id="thingList">
          <a rel={'external'} href={`${thing.link}`} className="thingTitle">{thing.name}</a>
          <div id='contactName'>
            {thing.contact}
          </div>
          <a id='contact' href="tel:{thing.contactNumber}">{thing.contactNumber}</a>
          <p> {thing.description}</p>
          <button className='deleteButton' onClick={() => handlePrivateDelete(thing)}>Delete</button>
        </div>
      </div>
    )
  })

  return (

    <div className='flex-column full-page'>
      <Navbar />
      <div id="logo-container">
        <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" />
      </div>
      {user ?
      <div>
      <h1>{user.name}</h1>
     <h2>{user.title}</h2>
     </div>
     : "" }
      {thingItems}
    </div>
  )
}



const mapDispatchToProps = (dispatch) => {
  return {
    onThingsLoaded: () => dispatch(actionCreators.fetchMyThings())
  }
}

const mapStateToProps = (state) => {
  return {
    things: state.things
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Private);

