import { useEffect, useState } from 'react';
import FeedBack from './FeedBack';
import Comments from './Comments';
import PostDisplay from "./PostDisplay";
import "./App.css";

function Card({things, reset, setReset}) {
    const [profileImage, setProfileImage] = useState()
    const thingItems = things.map(thing => {
        return (
            <div key={thing.id} className="grid-item">
                <PostDisplay thing={thing} profileImage={profileImage} reset={reset} setReset={setReset}/>
                <div className='feedback'>
                    <FeedBack thing={thing} />
                    <Comments thing={thing} />
                </div>
            </div>
        )
    })

    return (
        <>
            <aside id="overlay" className="overlay hide-overlay"></aside>
            <div className="grid-container">
                {thingItems}
            </div>
        </>
    )
}

export default Card