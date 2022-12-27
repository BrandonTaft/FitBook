import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';
import Avatar from 'react-avatar';

function Users(props) {
    useEffect(() => {
        props.onUsersLoaded()
    },[]);
       console.log("PROPS", props)
    const allUsers = props.users.map(user => {
        return (
        <div key={(user.id)} className="current-user">
            { user.email === null 
                ?
                <Avatar name={user.name} round={true} size={80} />
                :
                <Avatar src={user.email} className="rounded" size={80}/>
            }
           <span className='text-secondary'>{user.name}</span>
        </div>
        )
    })
     
     
     return (
        <div className="current-users">
       { allUsers }
       hey
       </div>
     )
}

const mapDispatchToProps = (dispatch) => {
    return {
      onUsersLoaded: () => dispatch(actionCreators.fetchCurrentUsers())
    }
  }
  
  const mapStateToProps = (state) => {
    return {
      users: state.users
    }
  }
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Users)