import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from 'react-avatar';
import UploadImage from './UploadImage';
import { MyCard } from './Cards';
import { BsFillPencilFill } from "react-icons/bs";
import logo from "../assets/logo-aqua.png";
import { addImagePopup } from '../utils/utils';

function Private() {
  const history = useHistory();
  const [myPosts, setMyPosts] = useState([]);
  const [pic, setPic] = useState(false);
  const [reset, setReset] = useState(false);
  const name = localStorage.getItem('name');
  const title = localStorage.getItem('title');
  const profilePic = localStorage.getItem('profile_pic');
  const token = localStorage.getItem('token');

  useEffect(() => {
    getUser()
    fetchMyPosts()
  }, [reset]);

  const getUser = () => {
    profilePic !== 'invalid' ? setPic(true) : setPic(false)
  }

  const deleteProfile = () => {
    fetch('http://127.0.0.1:8080/api/delete-profile', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }) .then(response => response.json())
    .then(result => {
      if (result) {
          history.push('/logout')
      }else{
        history.push('/feed')
      }
      })
  }

  function fetchMyPosts() {
    const user_Id = localStorage.getItem('user_Id')
    const token = localStorage.getItem('token')
    fetch(`http://127.0.0.1:8080/api/myposts/${user_Id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(myPosts => {
        if (myPosts.success === false) {
          history.push('/')
        } else {
          setMyPosts(myPosts)
        }
      })
  }

  return (
    <>
      <aside id="overlay" className="overlay hide-overlay"></aside>
      <div id="upload-image-popup" className="upload-image-popup">
        <UploadImage reset={reset} setReset={setReset} />
      </div>
      <div className='profile-container'>
        <span className='highlight' onClick={deleteProfile}>DELETE PROFILE</span>
        <div>
          <img id="full-logo" src={logo} alt="logo" height={150} width={250} />
        </div>
        <div>
          <div className="avatar-container">
            {pic
              ?
              <Avatar
                src={profilePic}
                className="rounded"
                size={150}
              />
              :
              <Avatar
                color="blue"
                name={name}
                round={true}
                size={150}
                textSizeRatio={2}
                maxInitials={2}
              />
            }
            <span onClick={addImagePopup} className='text-primary edit-image-icon' >
              <BsFillPencilFill />
              Edit
            </span>
          </div>
          <h1 className='highlight mb-0 ellipses'>
            {name}
          </h1>
          { title === "null"
            ?
            <h3 className='text-secondary mt-0'></h3>
            :
             <h3 className='text-secondary mt-0'> {title} </h3>
          }
          <label className='text-secondary'>
            POSTS
          </label>
          <div className="h-divider ma mt-5"></div>
        </div>
        <div className="profile-bottom">
          {myPosts.length === 0
            ?
            <h2 className='text-secondary'>
              You Haven't Posted Anything!
            </h2>
            :
            <MyCard posts={myPosts} reset={reset} setReset={setReset} />
          }
        </div>
      </div>
    </>
  )
}

export default Private
