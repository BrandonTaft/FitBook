import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';
import Navbar from './Navbar';
import Avatar from 'react-avatar';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import Messages from './Messages';


function Private(props) {
  const [pic, setPic] = useState(false);
  const [postPresent, setPostPresent] = useState(false)
  const id = localStorage.getItem('user_Id');
  const name = localStorage.getItem('name');
  const title = localStorage.getItem('title')
  useEffect(() => {
    props.onThingsLoaded()
    getUser()
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
    const bio = localStorage.getItem('bio')
    bio === "true" ? setPic(true) : setPic(false)
  }

  let postDisplay;
  if (Object.keys(props.things).length === 0) {
    postDisplay = <h2>You Haven't Posted Anything!</h2>
  } else {
    postDisplay = ""
  }

  let profileImage;
  if (pic === false) {
    profileImage = <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={name} round={true} />
  } else {
    profileImage = <AdvancedImage cldImg={myImage} className="rounded" />
  }


  const handlePrivateDelete = (thing) => {
    fetch(`http://127.0.0.1:8080/api/mythings/${thing.id}`, {
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
          {profileImage}
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
        <div>

          <div className="avatar-container">
            {profileImage}
            <NavLink to="/upload-image" >Upload New Image</NavLink>
          </div>
          <h1 className='yellow'>{name}</h1>
          <h2>{title}</h2>
          <label>POSTS</label>

        </div>
      <div className="profile-bottom">
        <div className='my-posts'>
          {postDisplay}
          {thingItems}
        </div>
       
        <Messages />
 
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

