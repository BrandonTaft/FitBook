import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { addPostPopup } from '../utils/utils';
import logo from "../assets/logo-aqua.png";
import { MdClose } from "react-icons/md";
import "./App.css"

function Post(props) {
    const [post, setPost] = useState()
    const history = useHistory();
    const handleAddPost = (e) => {
        setPost({
            ...post,
            priority: (localStorage.getItem('name')),
            userId: parseInt(localStorage.getItem('user_Id')),
            title: (localStorage.getItem('title')),
            contact: (localStorage.getItem('profile_pic')),
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
                    addPostPopup()
                    history.push('/redirect')
                } else {
                    console.log("error", result.message)
                }
            })
    }
    return (
        <div className='form'>
            <MdClose className='add-post-close' onClick={addPostPopup} />
            <div className="mb-2">
                <img id="full-logo" src={logo} alt="logo" height={150} width={250} />
            </div>
            <h1 className="postTitle">Make A Post</h1>
            <input className="textbox" type="text" name="name" onChange={handleAddPost} placeholder="Title" autoComplete='off' />
            <input className="textbox" type="url" name="link" onChange={handleAddPost} placeholder="Link"autoComplete='off' />
            <div>Description</div>
            <textarea className="textbox text-area" type="text" name="description" maxLength={255} onChange={handleAddPost} />
            <button className="btn mt-2" onClick={postTODB}>Submit</button>
        </div>
    )
}

export default Post