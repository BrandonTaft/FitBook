import { useLocation } from "react-router-dom";
import { TbArrowsMaximize } from "react-icons/tb";
import { timeSince, toggleBody } from '../utils/utils.js';
import Avatar from 'react-avatar';

function PostDisplay({ post, reset, setReset }) {
    const location = useLocation();
    const handlePostDelete = (post) => {
        fetch(`http://127.0.0.1:8080/api/mythings/${post.id}`, {
            method: 'DELETE'
        }).then(response => response.json())
            .then(result => {
                reset ? setReset(false) : setReset(true)
            })
    };

    let profileImage;
    const dateCreated = new Date(post.createdAt);
    post.contact === "invalid"
        ?
        profileImage = <Avatar color="blue" name={post.priority} round={true} size={150} textSizeRatio={2} maxInitials={2} />
        :
        profileImage = <Avatar src={post.contact} className="rounded" size={150} />
    return (
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
                {location.pathname === '/profile' ?
                    <button className='profile-btn btn' onClick={() => handlePostDelete(post)}>Delete</button>
                    : ""}

            </div>
        </>
    )
}

export default PostDisplay