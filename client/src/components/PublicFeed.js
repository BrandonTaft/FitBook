import { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import "./App.css"

function PublicFeed(props) {

  useEffect(() => {
    props.onThingsLoaded()
  }, [])



  const handlePublicDelete = (thing) => {
    fetch(`https://lit-ravine-06265.herokuapp.com/api/publicthings/${thing.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        props.onThingsLoaded()
      })
    console.log(props)
  }


  const thingItems = props.things.map(thing => {
    const randomNumber = Math.floor(Math.random() * 14) + 1;
    return (
      <div key={thing.id} id='listContainer'>
        <div id="picBox">
          <div className="fill">
            <img id="profile-pic" src={"/" + "pic" + randomNumber + ".png"} alt="Profile-Pic" />
          </div>
          <div id='nameBox'>
            {thing.priority}
          </div>
        </div>
        <div key={thing.id} id="thingList">
          <a rel={'external'} target="_blank" href={`${thing.link}`} className="thingTitle">{thing.name}</a>
          <div id='contactName'>
            {thing.contact}
          </div>
          <a id='contact' href="tel:{thing.contactNumber}">{thing.contactNumber}</a>
          <p> {thing.description}</p>
        </div>
      </div>
    )
  })

  return (
    <div>
      <Navbar />
      <div id="logo-container">
        <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" />
      </div>
      <h2><NavLink to="/post" className="postButton"  >Add Post</NavLink></h2>
      {thingItems}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onThingsLoaded: () => dispatch(actionCreators.fetchThings())
  }
}

const mapStateToProps = (state) => {
  return {
    things: state.things
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PublicFeed);

