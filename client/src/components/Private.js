import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';
import Navbar from './Navbar';
import Avatar from 'react-avatar';
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";
import {Transformation} from "@cloudinary/url-gen";
import {image} from "@cloudinary/url-gen/qualifiers/source";


function Private(props) {
  const [user, setUser] = useState();
  // const [pic, setPic] = useState();
  const id = localStorage.getItem('user_Id')
  useEffect(() => {
    props.onThingsLoaded()
    getUser()
    // getPic(id)
  }, [])

   // Creates and configures the Cloudinary instance.
   const cld = new Cloudinary({
    cloud: {
      cloudName: 'dxbieon3u',
      invalidate: true
    }
  }); 

  const myImage = cld.image(id);

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

  // const getPic = async(id) => {
    
  //   // fetch(`https://lit-ravine-06265.herokuapp.com/api/get-image/${id}`, {
  //     fetch(`http://127.0.0.1:8080/api/get-image/${id}`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(result => {
  //      if(result.total_count > 0) {
  //       setPic(result.resources[0].secure_url)
  //       }
  //     })
  // }

  const handlePrivateDelete = (thing) => {
    fetch(`https://lit-ravine-06265.herokuapp.com/api/mythings/${thing.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        props.onThingsLoaded()
      })
  }
console.log(myImage)
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
            {/* <Avatar src={`https://i.pravatar.cc/150?img=${user.id - 68}`} round={true} size={150} /> */}
            {myImage ?
            <AdvancedImage cldImg={myImage} />
            : <Avatar src={`https://i.pravatar.cc/150?img=${user.id - 68}`} round={true} size={150} />}
            <NavLink to="/upload-image" >Upload New Image</NavLink>
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

