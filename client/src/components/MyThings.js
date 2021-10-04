import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../store/creators/actionCreators'
import Menu from './Menu'
import './myThings.css'
import Navbar from './Navbar'


function MyThings(props) {

    useEffect(() => {
      props.onThingsLoaded()
    }, [])

    
    const handleThingDelete = (thing) => {
        fetch(`http://localhost:8080/api/mythings/${thing.id}`, {
          method: 'DELETE'
        }).then(response => response.json())
        .then(result => { 
          props.onThingsLoaded()
         
        })
    }
    const thingItems = props.things.map(thing => {
        return <ul key={thing.id} id="thingList">
            <h1>Title: {thing.name}</h1>
            <h2>Priority: {thing.priority}</h2>
            <h3>{thing.duedate}</h3>
            <a rel={'external'} target="_blank" href={`${thing.link}`}>Pay Bill</a>
            <h3>{thing.contact}</h3>
          
            <a href="tel:{thing.contactNumber}">{thing.contactNumber}</a>
            <p>Description: {thing.description}</p>
            <button className="button" onClick={() => handleThingDelete(thing)}>Delete</button>
          
        </ul>
    })
    
return(

        <div>
          <Navbar />
            <Menu />
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

