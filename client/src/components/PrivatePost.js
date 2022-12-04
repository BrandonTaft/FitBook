import { useState } from 'react'
import Navbar from './Navbar'
import  "./App.css"


function PrivatePost(props){

const [privatepost, setPrivatepost] = useState({})
    
        const handleprivatepost = (e) => {
            setPrivatepost({
                ...privatepost,
                priority:(localStorage.getItem('name')),
                userId: parseInt(localStorage.getItem('user_Id')),
                [e.target.name]: e.target.value
    
            })
        }
    
    
    const postTODB = () => {
        fetch("http://127.0.0.1:8080/api/addmythings", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(privatepost)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.history.push('/private')

                }
            })
    }
    

    return (
      
          
         <div>
              <Navbar />
              <div id="addBoxes">
            <h1>Post To Your  Private Feed</h1>
            <input className="textbox" type="text" name="name" onChange={handleprivatepost} placeholder="Name Your Workout" /><br></br>
            <input className="textbox" type="text" name="duedate" onChange={handleprivatepost} placeholder="DueDate" /><br></br>
            <input className="textbox" type="text" name="priority" onChange={handleprivatepost} placeholder="Priority" /><br></br>
            <input className="textbox" type="url" name="link" onChange={handleprivatepost} placeholder="Link" /><br></br>
            <input className="textbox" type="text" name="contact" onChange={handleprivatepost} placeholder="Contact Name" /><br></br>
            <input className="textbox" type="tel" name="contactNumber" onChange={handleprivatepost}placeholder="Contact Number" /><br></br>
            <textarea id='description' className="textbox" type="text" name="description" onChange={handleprivatepost} placeholder="Description" /><br></br>
            <button className="billButton" onClick={postTODB}>Submit</button>
        </div>
        </div>
)
        }

        export default PrivatePost