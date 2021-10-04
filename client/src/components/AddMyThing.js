import { useEffect, useState } from 'react'
import Menu from './Menu'
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
        fetch("http://localhost:8080/api/addmythings", {
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
      
          
          <div id="boxes">
              <Menu />
            <h1>NEW THING</h1>
            <input className="textbox" type="text" name="name" onChange={handleAddMyThing} placeholder="Name Your Thing" /><br></br>
            <input className="textbox" type="text" name="duedate" onChange={handleAddMyThing} placeholder="DueDate" /><br></br>
            <input className="textbox" type="text" name="priority" onChange={handleAddMyThing} placeholder="Priority" /><br></br>
            <input className="textbox" type="url" name="link" onChange={handleAddMyThing} placeholder="Link" /><br></br>
            <input className="textbox" type="text" name="contact" onChange={handleAddMyThing} placeholder="Contact Name" /><br></br>
            <input className="textbox" type="tel" name="contactNumber" onChange={handleAddMyThing} placeholder="Contact Number" /><br></br>
            <textarea id='description' className="textbox" type="text" name="description" onChange={handleAddMyThing} placeholder="Description" /><br></br>
            <button className="button" onClick={postTODB}>Add Thing</button>
        </div>

)
        }

        export default AddMyThing