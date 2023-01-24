import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import Avatar from 'react-avatar';
import UploadImage from './UploadImage';
import { MyCard } from './Cards';
import { BsFillPencilFill } from "react-icons/bs";
import { addImagePopup } from '../utils/utils';

function Private() {
  const history = useHistory();
  const [myPosts, setMyPosts] = useState([]);
  const [pic, setPic] = useState(false);
  const [reset, setReset] = useState(false);
  const name = Cookies.get('name');
  const token = Cookies.get('token');
  const userId = Cookies.get('user_Id');
  const profilePic = Cookies.get('profile_pic')
  useEffect(() => {
    const getPic = () => {
      `${profilePic}` === "null" ? setPic(false) : setPic(true)
    }
    function fetchMyPosts() {
      fetch(`https://smapp.herokuapp.com/api/myposts/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(myPosts => {
          if (myPosts) {
            setMyPosts(myPosts)
          } else {
            setMyPosts("")
          }
        })
    }
    getPic()
    fetchMyPosts()
  }, [reset]);



  const deleteProfile = () => {
    fetch('https://smapp.herokuapp.com/api/delete-profile', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then(response => response.json())
      .then(result => {
        if (result) {
          history.push('/logout')
        } else {
          history.push('/feed')
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
        <div>
          <div className="avatar-container">
            {pic
              ?
              <Avatar
                src={profilePic}
                className="rounded"
                size={120}
                referrerPolicy="no-referrer"
              />
              :
              <Avatar
                color="blue"
                name={name}
                round={true}
                size={120}
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
           <span className='highlight' onClick={deleteProfile}>DELETE PROFILE</span>
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
