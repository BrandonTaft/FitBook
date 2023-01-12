import { useState } from 'react';
import FeedBack from './FeedBack';
import Comments from './Comments';
import PostDisplay from "./PostDisplay";
import "./App.css";

export function Card({publicPosts, allUsers }) {
    
    const [profileImage, setProfileImage] = useState()
    const publicPostItems = publicPosts.map(publicPost => {
        return (
            <div key={publicPost.id} className="grid-item">
                <PostDisplay post={publicPost} profileImage={profileImage} allUsers= {allUsers}/>
                <div className='feedback'>
                    <FeedBack post={publicPost} />
                    <Comments post={publicPost} />
                </div>
            </div>
        )
    })

    return (
        <>
            <aside id="overlay" className="overlay hide-overlay"></aside>
            <div className="grid-container">
                {publicPostItems}
            </div>
        </>
    )
}

export function MyCard({posts, reset, setReset}) {
    const [profileImage, setProfileImage] = useState()
    const postItems = posts.map(post => {
        return (
            <div key={post.id} className="grid-item">
                <PostDisplay post={post} profileImage={profileImage} reset={reset} setReset={setReset}/>
                <div className='feedback'>
                    <FeedBack post={post} />
                    <Comments post={post} />
                </div>
            </div>
        )
    })

    return (
        <>
            <aside id="overlay" className="overlay hide-overlay"></aside>
            <div className="grid-container">
                {postItems}
            </div>
        </>
    )
}
