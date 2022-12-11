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
import Card from './Card';
import { BsFillPencilFill } from "react-icons/bs";
import logo from "../assets/logo-aqua.png"


function Private(props) {
  const [pic, setPic] = useState(false);
  const [reset, setReset] = useState(false);
  const [postPresent, setPostPresent] = useState(false)
  const id = localStorage.getItem('user_Id');
  const name = localStorage.getItem('name');
  const title = localStorage.getItem('title')
  useEffect(() => {
    props.onThingsLoaded()
    getUser()
  }, [reset])

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
    postDisplay = <h2 className='text-secondary'>You Haven't Posted Anything!</h2>
  } else {
    postDisplay = ""
  }

  let profilePic;
  if (pic === false) {
    profilePic = <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={name} round={true} />
  } else {
    profilePic = <AdvancedImage cldImg={myImage} className="rounded" />
  }


  const handlePrivateDelete = (thing) => {
    fetch(`http://127.0.0.1:8080/api/mythings/${thing.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        props.onThingsLoaded()
      })
  }

  // const thingItems = props.things.map(thing => {
  //   const name = localStorage.getItem('name')
  //   const dateCreated = new Date(thing.createdAt);
  //   return (
  //     <div key={thing.id} className="profile-post">
  //      <TbArrowsMaximize className="text-primary maximize" onClick={(e) => toggleBody(e, thing)} />
  //               <div className="avatar-container">
  //                   {profilePic}
  //                   <div className="bold text-primary">
  //                       <span className='user-name'>{thing.priority}</span><br />
  //                       <span className="title highlight">{thing.contactNumber}</span>
  //                   </div>
  //               </div>
  //               <div className='post-body' id='post-body' >
  //                   <span className='post-title'>
  //                       {thing.name}
  //                   </span><br />
  //                   {thing.link ?
  //                       <a rel={'external'} target="_blank" href={`${thing.link}`} className="post-link">Try it out</a>
  //                       : ""}
  //                   <br />
  //                   <span className="text-secondary">{timeSince(dateCreated)}</span>
  //                   <p className='post-description'>
  //                       {thing.description}
  //                   </p>
  //                   <button className='profile-btn btn' onClick={() => handlePrivateDelete(thing)}>Delete</button>
  //               </div>
          
       
  //     </div>
  //   )
  // })

  
  return (

    <>
      <Navbar />
      <aside id="overlay" className="overlay hide-overlay"></aside>
      <div className='profile-container'>
      
        <div>
          <img id="full-logo" src={logo} alt="logo" height={150} width={250} />
        </div>
        <div>

          <div className="avatar-container">
            {profilePic}
            <NavLink to="/upload-image" className='text-primary edit-image-icon' ><BsFillPencilFill />Edit</NavLink>
          </div>
          <h1 className='highlight'>{name}</h1>
          <h2 className='text-secondary'>{title}</h2>
          <label className='text-secondary'>POSTS</label>

        </div>
      <div className="profile-bottom">
        <div className='my-posts'>
          {postDisplay}
          <Card things={props.things} reset={reset} setReset={setReset} />
        </div>
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

