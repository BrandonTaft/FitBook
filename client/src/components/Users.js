import { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';
import Avatar from 'react-avatar';
import SendMessage from './SendMessage';
import { sendDmPopup } from '../utils/utils';

function Users(props) {
    useEffect(() => {
        props.onUsersLoaded()
    },[]);
    const allUsers = props.users.map(user => {
        return (
        <div key={(user.id)} id="TEST" className="current-user" onClick={(e) => sendDmPopup(e)}>
            { user.email === null 
                ?
                <Avatar name={user.name} round={true} size={80} />
                :
                <Avatar id={user.id} src={user.email} className="rounded" size={80}/>
            }
           <div className='text-secondary current-user-name'>{user.name}</div>
        </div>
        )
    })
     
     
     return (
        <div className="current-users">
          <SendMessage />
       { allUsers }
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