import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import Menu from './Menu'
import './allThings.css'
import  Avatar from "react-avatar";
import Navbar from './Navbar'

function AllThings(props) {

   
    useEffect(() => {
      props.onThingsLoaded()
    }, [])

    

    const handleThingDelete = (thing) => {
        fetch(`http://localhost:8080/api/publicthings/${thing.id}`, {
          method: 'DELETE'
        }).then(response => response.json())
        .then(result => { 
          props.onThingsLoaded()
        })
        console.log(props)
    }

    
  
    const thingItems = props.things.map(thing => {
      const name = localStorage.getItem ('name')
      console.log(thing.priority)
        return (
        <div key={thing.id}id = 'listContainer'>
          <div id="picBox">
            <div>
          <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={thing.name} size="150" />
          </div>
      <div id='nameBox'> {name}</div>
          
          </div>
          
          <div key={thing.id} id="thingList">
            <h4 className='thingTitle'>{thing.name}</h4>
            
            {/* <p>{thing.duedate}</p> */}
            <a rel={'external'} target="_blank" href={`${thing.link}`}className="billButton">    Pay Bill     </a>
            <div>{thing.contact}</div>
          
            <a id='contact'href="tel:{thing.contactNumber}">{thing.contactNumber}</a>
            <p> {thing.description}</p>
            <button className= 'billButton' onClick={() => handleThingDelete(thing)}>Delete</button>
          
        </div>
        </div>
        )
    })

    return (
      <div>
          <Menu />
          <Navbar />
        {thingItems}
    
       
      </div>
    )
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//       onThingsLoaded: (things) => dispatch({type: 'THINGS_LOADED', payload: things})
//     }
//   }

const mapDispatchToProps = (dispatch) => {
   return {
     onThingsLoaded: () => dispatch(actionCreators.fetchThings())
   }
 }

const mapStateToProps = (state) => {
  return {
    things: state.things 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AllThings);

