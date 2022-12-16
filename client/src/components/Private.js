import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'react-avatar';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Transformation } from "@cloudinary/url-gen";
import { image } from "@cloudinary/url-gen/qualifiers/source";
import Messages from './Messages';
import UploadImage from './UploadImage';
import { MyCard } from './Cards';
import { BsFillPencilFill } from "react-icons/bs";
import logo from "../assets/logo-aqua.png";
import { addImagePopup } from '../utils/utils';

function Private() {
  const [myPosts, setMyPosts] = useState([])
  const [pic, setPic] = useState(false);
  const [reset, setReset] = useState(false);
  const id = localStorage.getItem('user_Id');
  const name = localStorage.getItem('name');
  const title = localStorage.getItem('title')

  useEffect(() => {
    fetchMyPosts()
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

  let profilePic;
  if (pic === false) {
    profilePic = <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={name} round={true} />
  } else {
    profilePic = <AdvancedImage cldImg={myImage} className="rounded" />
  }


  const handlePrivateDelete = (posts) => {
    fetch(`http://127.0.0.1:8080/api/mythings/${posts.id}`, {
      method: 'DELETE'
    }).then(response => response.json())
      .then(result => {
        fetchMyPosts()
      })
  }


  function fetchMyPosts() {
    const user_Id = localStorage.getItem('user_Id')
    const token = localStorage.getItem('jsonwebtoken')
    fetch(`http://127.0.0.1:8080/api/mythings/${user_Id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(myPosts => {
        console.log(myPosts)
        if (myPosts.success === false) {
          setMyPosts("")
        } else {
          setMyPosts(myPosts)
        }
      })
  }

  // const thingItems = props.posts.map(thing => {
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
      <aside id="overlay" className="overlay hide-overlay"></aside>
      <div id="upload-image-popup" className="upload-image-popup">
        <UploadImage />
      </div>
      <div className='profile-container'>
        <div>
          <img id="full-logo" src={logo} alt="logo" height={150} width={250} />
        </div>
        <div>

          <div className="avatar-container">
            {profilePic}
            <span onClick={addImagePopup} className='text-primary edit-image-icon' ><BsFillPencilFill />Edit</span>
          </div>
          <h1 className='highlight mb-0'>{name}</h1>
          <h3 className='text-secondary mt-0'>{title}</h3>
          <label className='text-secondary'>POSTS</label>
          <div className="h-divider ma mt-5"></div>
        </div>
        <div className="profile-bottom">
          {myPosts.length === 0
            ?
            <h2 className='text-secondary'>You Haven't Posted Anything!</h2>
            :
            <MyCard posts={myPosts} reset={reset} setReset={setReset} />
          }
        </div>
      </div>
    </>
  )
}



// const mapDispatchToProps = (dispatch) => {
//   return {
//     onpostsLoaded: () => dispatch(actionCreators.fetchMyPosts())
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     posts: state.posts
//   }
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Private);
export default Private
