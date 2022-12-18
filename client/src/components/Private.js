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
  const theImage = localStorage.getItem('url')
  useEffect(() => {
    fetchMyPosts()
    getUser()
  }, [reset])

  // Creates and configures the Cloudinary instance.
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dxbieon3u',
      version: '1671323430',
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
    profilePic = <Avatar src={theImage} className="rounded" />
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



  return (

    <>
      <aside id="overlay" className="overlay hide-overlay"></aside>
      <div id="upload-image-popup" className="upload-image-popup">
        <UploadImage reset={reset} setReset={setReset}/>
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
