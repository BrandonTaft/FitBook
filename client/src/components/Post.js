import React, { useState} from 'react';
import Navbar from './Navbar'
import  "./App.css"



function Post(props) {
    const [post, setPost] = useState()
    const handleAddPost = (e) => {
        setPost({
            ...post,
            priority:(localStorage.getItem('name')),
            userId: parseInt(localStorage.getItem('user_Id')),
            title:(localStorage.getItem('title')),
            [e.target.name]: e.target.value

        })
    }
    const postTODB = () => {
        console.log(post)
       
        const test = {
            "name" : "test"
        }

        console.log(test)
        fetch("https://lit-ravine-06265.herokuapp.com/api/addpost", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
            //body: JSON.stringify(test)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {           
                    props.history.push('/publicfeed')
                    console.log("did",result)
                }else {
                    console.log("error",result.message)
                }
            })
    }
    return (
        <>
        <Navbar />
            <h1 className="postTitle">Post Your Workout</h1>     
            <input className="textbox" type="text" name="name" onChange={handleAddPost} placeholder="Name Your Workout" />
            <input className="textbox" type="url" name="link" onChange={handleAddPost} placeholder="Link" />
            <input className="textbox" type="text" name="contact" onChange={handleAddPost} placeholder="Your Comments" />
            <div id="words">Description</div>
            <textarea id='description' className="textbox" type="text" name="description" maxLength={255} onChange={handleAddPost}  />
            <button className="billButton" onClick={postTODB}>Submit</button>
        </>
    )


}

export default Post