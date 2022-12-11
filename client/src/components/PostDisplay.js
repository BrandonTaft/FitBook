import { useLocation} from "react-router-dom";
import { TbArrowsMaximize } from "react-icons/tb";
import { timeSince, toggleBody } from '../utils/utils.js';
import Avatar from 'react-avatar';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

function PostDisplay({post, reset, setReset}) {
    const location = useLocation();
    const handlePrivateDelete = (post) => {
        fetch(`http://127.0.0.1:8080/api/mythings/${post.id}`, {
          method: 'DELETE'
        }).then(response => response.json())
          .then(result => {
            reset ? setReset(false) : setReset(true)
          })
      };

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dxbieon3u',
            invalidate: true
        }
    });
    let profileImage;
    const myImage = cld.image(post.user_id);
    const dateCreated = new Date(post.createdAt);
    post.contact === "true" ?
        profileImage = <AdvancedImage cldImg={myImage} className="rounded" />
        :
        profileImage = <Avatar src={`https://i.pravatar.cc/150?img=${post.user_id - 68}`} round={true} size={150} />;
    return(
        <>
        <TbArrowsMaximize className="white maximize" onClick={(e) => toggleBody(e, post)} />
        <div className="avatar-container">
            {profileImage}
            <div className="bold white">
                <span className='user-name'>{post.priority}</span><br />
                <span className="title yellow">{post.contactNumber}</span>
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
            { location.pathname === '/profile' ?
             <button className='profile-btn btn' onClick={() => handlePrivateDelete(post)}>Delete</button>
            : "" }
           
        </div>
        </>
    )
}

export default PostDisplay