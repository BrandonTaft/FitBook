import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import Navbar from './Navbar';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import { FcLike } from 'react-icons/fc';
import { FaRegComment } from 'react-icons/fa';

import "./App.css"

function PublicFeed(props) {
  const [like, setLike] = useState()
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

  const toggleBody = event => {
  event.currentTarget.classList.toggle('show')
  }


  const thingItems = props.things.map(thing => {

    const randomNumber = Math.floor(Math.random() * 70) + 1;
    return (
        <div key={thing.id} className="grid-item">
          <div className="avatar-container">
            {/* <img className="avatar" src={"/" + "pic" + randomNumber + ".png"} alt="Profile-Pic" /> */}
            <Avatar src={`https://i.pravatar.cc/150?img=${randomNumber}`} />
            <div className="bold white">
              {thing.priority}
            </div>
          </div>
          <div className='post-body' onClick={toggleBody}>{thing.name}<p> {thing.description}</p></div>
          {/* <a rel={'external'} target="_blank" href={`${thing.link}`} className="thingTitle">{thing.name}</a> */}
          {/* <div id='contactName'>
            {thing.contact}
          </div> */}
          {/* <a id='contact' href="tel:{thing.contactNumber}">{thing.contactNumber}</a> */}
          {/* <p> {thing.description}</p> */}
          <div>
            <FcLike onClick={ () => setLike(like + 1) } className='red'/>{thing.score}
            <FaRegComment className='white'/>
            </div>
        </div>
      )
  })

  return (
    <>
      <Navbar />
      {/* <div className="feed-logo">
      <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" width={200} height={150}/>
      </div> */}
      <div className="grid-container">
      {thingItems}
    </div>
    </>
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

