import { useState } from 'react';
import { useLocation } from "react-router-dom";
import { SendAutoMessage } from './SendMessage.js';
import { TbArrowsMaximize } from "react-icons/tb";
import { timeSince, toggleBody } from '../utils/utils.js';
import Avatar from 'react-avatar';

function PostDisplay({ post, reset, setReset, allUsers }) {
    const location = useLocation();
    const [showDmPopup, setShowDmPopup] = useState(false);
    const [sendTo, setSendTo] = useState({});

    function toggleDmPopup(id, name) {
        setSendTo({id: id, name: name})
        { showDmPopup ? setShowDmPopup(false) : setShowDmPopup(true) }
      }

    let profileImage;
    if(allUsers){
    for(let i = 0; i < allUsers.length; i++){
        if(allUsers[i].id == post.user_id){
           if(allUsers[i].profile_pic == null){
            profileImage = <Avatar color="blue" name={post.poster} round={true} size={150} textSizeRatio={2} maxInitials={2} />
           }else{
           profileImage = <Avatar src={allUsers[i].profile_pic} referrerPolicy="no-referrer" className="rounded" size={150} />
           }
        }
    }
}
    
    const handlePostDelete = (post) => {
        fetch(`http://127.0.0.1:8080/api/mythings/${post.id}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(result => {
                reset ? setReset(false) : setReset(true)
            })
    };


    
    const dateCreated = new Date(post.createdAt);
    return (
        <>
             {showDmPopup ? <SendAutoMessage sendTo={sendTo} setShowDmPopup={setShowDmPopup}/> : ""}
            <TbArrowsMaximize className="white maximize" onClick={(e) => toggleBody(e, post)} />
            <div className="avatar-container">
                <div onClick={() => { toggleDmPopup(post.user_id, post.poster) }}>
                    {profileImage}
                </div>
                <div className="bold white">
                    <span className='user-name'>{post.poster}</span><br />
                </div>
            </div>
            <div className='post-body' id='post-body' >
                <span className='post-title'>
                    {post.name}
                </span><br />
                {post.link ?
                    <a rel={'external'} target="_blank" href={`${post.link}`} className="post-link">Try it out</a>
                    : ""}
                <br />
                <span className="off-white">{timeSince(dateCreated)}</span>
                <p className='post-description'>
                    {post.description}
                </p>
                {location.pathname === '/profile' ?
                    <button className='profile-btn btn' onClick={() => handlePostDelete(post)}>Delete</button>
                    : ""}

            </div>
        </>
    )
}

export default PostDisplay