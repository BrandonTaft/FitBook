import { TbArrowsMaximize } from "react-icons/tb";
import { timeSince, toggleBody } from '../utils/utils.js';
import Avatar from 'react-avatar';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

function PostDisplay({thing}) {
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dxbieon3u',
            invalidate: true
        }
    });
    let profileImage;
    const myImage = cld.image(thing.user_id);
    const dateCreated = new Date(thing.createdAt);
    thing.contact === "true" ?
        profileImage = <AdvancedImage cldImg={myImage} className="rounded" />
        :
        profileImage = <Avatar src={`https://i.pravatar.cc/150?img=${thing.user_id - 68}`} round={true} size={150} />;
    return(
        <>
        <TbArrowsMaximize className="white maximize" onClick={(e) => toggleBody(e, thing)} />
        <div className="avatar-container">
            {profileImage}
            <div className="bold white">
                <span className='user-name'>{thing.priority}</span><br />
                <span className="title yellow">{thing.contactNumber}</span>
            </div>
        </div>
        <div className='post-body' id='post-body' >
            <span className='post-title'>
                {thing.name}
            </span><br />
            {thing.link ?
                <a rel={'external'} target="_blank" href={`${thing.link}`} className="post-link">Try it out</a>
                : ""}
            <br />
            <span className="off-white">{timeSince(dateCreated)}</span>
            <p className='post-description'>
                {thing.description}
            </p>
        </div>
        </>
    )
}

export default PostDisplay