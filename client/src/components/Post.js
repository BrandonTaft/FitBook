import React, { useState } from 'react';
import Navbar from './Navbar'
import "./App.css"

function Post(props) {
    const [post, setPost] = useState()
    const handleAddPost = (e) => {
        setPost({
            ...post,
            priority: (localStorage.getItem('name')),
            userId: parseInt(localStorage.getItem('user_Id')),
            title: (localStorage.getItem('title')),
            contact: (localStorage.getItem('bio')),
            [e.target.name]: e.target.value

        })
    }
    const postTODB = () => {
        fetch("http://127.0.0.1:8080/api/addpost", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.history.push('/publicfeed')
                    console.log("did", result)
                } else {
                    console.log("error", result.message)
                }
            })
    }
    return (
        <>
            <Navbar />
            <div className='post-container'>
                <div className="mb-2">
                    <img id="full-logo" src="fitbook-full-aqua.png" alt="logo" height={150} width={250} />
                </div>
                <div className='form'>
                    <h1 className="postTitle">Make A Post</h1>
                    <input className="textbox" type="text" name="name" onChange={handleAddPost} placeholder="Title" />
                    <input className="textbox" type="url" name="link" onChange={handleAddPost} placeholder="Link" />
                    <div>Description</div>
                    <textarea className="textbox text-area" type="text" name="description" maxLength={255} onChange={handleAddPost} />
                    <button className="btn" onClick={postTODB}>Submit</button>
                </div>
            </div>
        </>
    )


}

export default Post