import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';
import Navbar from './Navbar';
import Avatar from 'react-avatar';


function Private(props) {
  const [user, setUser] = useState()
  useEffect(() => {
    props.onThingsLoaded()
    getUser()
  }, [])

  const getUser = () => {
    const id = localStorage.getItem('user_Id')
    fetch(`https://lit-ravine-06265.herokuapp.com/api/users${id}`, {
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
    const name = localStorage.getItem('name')
    return (
      <div key={thing.id} className="profile-post">
          <div className="fill">
            <Avatar src={`https://i.pravatar.cc/150?img=${thing.user_id - 68}`} round={true} size={150} />
          </div>
          <div>
            {name}
          </div>
        <div key={thing.id}>
          <a rel={'external'} href={`${thing.link}`} className="thingTitle">{thing.name}</a>
          <p> {thing.description}</p>
          <button className='profile-btn btn' onClick={() => handlePrivateDelete(thing)}>Delete</button>
        </div>
      </div>
    )
  })

  return (

    <>
      <Navbar />
      <div className='profile-container'>
        <div>
          <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" height={150} width={250} />
        </div>
        {user ?
          <div>
            <div className="avatar-container">
            <Avatar src={`https://i.pravatar.cc/150?img=${user.id - 68}`} round={true} size={150} />
            </div>
            <h1 className='yellow'>{user.name}</h1>
            <h2>{user.title}</h2>
            <label>POSTS</label>
          </div>
          : ""}
        <div className='my-posts'>
          {thingItems}
        </div>
      </div>
    </>
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

