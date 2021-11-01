import React, { useState, useEffect } from 'react';



function ProfilePage(props) {
    //Get User Info From Server And Display  
const [user, setUser] = useState([])

useEffect(() => { getUser() }, [])

const getUser = () => {
    const token = localStorage.getItem('jsonwebtoken')
    fetch('http://localhost:8080/api/profile',{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(user => {
            console.log(user)
            setUser(user)
        })
    }




    


    

    // const displayProfile = props.user.map(user => {
    //     return <ul key={user.id} id="thingList">
    //         <h1>UserName: {user.name}</h1>
    //         <h2>Email: {user.email}</h2>
            
    //         {/* //<button className="button" onClick={() => handleUserDelete(user)}>Delete</button> */}
    //     </ul>
        

    // })

    
    return (
        <div>
{/* //            {displayProfile} */}
        </div>
    )
    }
    
export default ProfilePage