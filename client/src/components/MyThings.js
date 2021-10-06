import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import MyMenu from './MyMenu'
import './allThings.css'
import Navbar from './Navbar'
import  Avatar from "react-avatar";



function MyThings(props) {

    useEffect(() => {
      props.onThingsLoaded()
    }, [])

    
    const handleThingDelete = (thing) => {
        fetch(`https://lit-ravine-06265.herokuapp.com/api/mythings/${thing.id}`, {
          method: 'DELETE'
        }).then(response => response.json())
        .then(result => { 
          props.onThingsLoaded()
          })
    }
    const thingItems = props.things.map(thing => {
      const name = localStorage.getItem ('name')
      return (
        <div key={thing.id}id = 'listContainer'>
          <div id="picBox">
            <div>
          <Avatar color={Avatar.getRandomColor('sitebase', ['red', 'green', 'blue'])} name={thing.name} />
          </div>
      <div id='nameBox'> {name}</div>
          
          </div>
          
          
          <div key={thing.id} id="thingList">
            <h4 className='thingTitle'>{thing.name}</h4>
            
            {/* <p>{thing.duedate}</p> */}
            <a rel={'external'} target="_blank" href={`${thing.link}`}className="billButton">    Watch    </a>
            <div id='contactName'>{thing.contact}</div>
          
            <a id='contact'href="tel:{thing.contactNumber}">{thing.contactNumber}</a>
            <p> {thing.description}</p>
            <button className= 'billButton' onClick={() => handleThingDelete(thing)}>Delete</button>
          
        </div>
        </div>
      )
        // return <ul key={thing.id} id="thingList">
        //     <h1>Title: {thing.name}</h1>
        //     <h2>Priority: {thing.priority}</h2>
        //     <h3>{thing.duedate}</h3>
        //     <a rel={'external'} target="_blank" href={`${thing.link}`}>Pay Bill</a>
        //     <h3>{thing.contact}</h3>
          
        //     <a href="tel:{thing.contactNumber}">{thing.contactNumber}</a>
        //     <p>Description: {thing.description}</p>
        //     <button className="button" onClick={() => handleThingDelete(thing)}>Delete</button>
          
        // </ul>
    })
    
return(

        <div>
          <Navbar />
            <MyMenu />
        {thingItems}
    
       
      </div>
    )
}


const mapDispatchToProps = (dispatch) => {
   return {
     onThingsLoaded: () => dispatch(actionCreators.fetchMyThings())
   }
 }

const mapStateToProps = (state) => {
  return {
    things: state.things 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyThings);

