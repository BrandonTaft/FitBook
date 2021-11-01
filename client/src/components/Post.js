import React, { useState} from 'react';
import Navbar from './Navbar'
import  "./App.css"



function Post(props) {

    const [post, setPost] = useState({})

    const handleAddPost = (e) => {
        setPost({

            ...post,
            priority:(localStorage.getItem('name')),
                userId: parseInt(localStorage.getItem('user_Id')),
            [e.target.name]: e.target.value

        })
    }



    const postTODB = () => {
        fetch("https://lit-ravine-06265.herokuapp.com/api/addmythings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post)
           
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    
                    props.history.push('/publicfeed')

                }
            })
    }
    return (
        <div>
        <Navbar />
        <div id="addBoxes">
            <h1 className="postTitle">Post Your Workout</h1>
           
            <input className="textbox" type="text" name="name" onChange={handleAddPost} placeholder="Name Your Workout" />
            <input className="textbox" type="url" name="link" onChange={handleAddPost} placeholder="Link" />
            <input className="textbox" type="text" name="contact" onChange={handleAddPost} placeholder="Your Comments" />
            <div id="words">Description</div>
            <textarea id='description' className="textbox" type="text" name="description" onChange={handleAddPost}  />
            {/*<input className="textbox" type="tel" name="contactNumber" onChange={handleAddPost}placeholder="Contact Number" /> */}
            <button className="billButton" onClick={postTODB}>Submit</button>
        </div>
        </div>
    )


}

export default Post