import { useState } from 'react'
import './App.css';
import Menu from './Menu'
import Navbar from './Navbar'


function AddMyThing(props){

const [myThing, setmyThing] = useState({})
    
        const handleAddMyThing = (e) => {
            setmyThing({
    
                ...myThing,
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
            body: JSON.stringify(myThing)
        }).then(response => response.json())
            .then(result => {
                if (result.success) {
                    props.history.push('/mythings')

                }
            })
    }
    

    return (
      
          
         <div>
              <Navbar />
              <Menu />
              <div id="addBoxes">
            <h1>ADD YOUR WORKOUT</h1>
            <input className="textbox" type="text" name="name" onChange={handleAddMyThing} placeholder="Name Your Workout" /><br></br>
            <input className="textbox" type="text" name="duedate" onChange={handleAddMyThing} placeholder="DueDate" /><br></br>
            <input className="textbox" type="text" name="priority" onChange={handleAddMyThing} placeholder="Priority" /><br></br>
            <input className="textbox" type="url" name="link" onChange={handleAddMyThing} placeholder="Link" /><br></br>
            <input className="textbox" type="text" name="contact" onChange={handleAddMyThing} placeholder="Contact Name" /><br></br>
            <input className="textbox" type="tel" name="contactNumber" onChange={handleAddMyThing} placeholder="Contact Number" /><br></br>
            <textarea id='description' className="textbox" type="text" name="description" onChange={handleAddMyThing} placeholder="Description" /><br></br>
            <button className="button" onClick={postTODB}>Add My Workout</button>
        </div>
        </div>
)
        }

        export default AddMyThing