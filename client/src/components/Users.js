import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../store/creators/actionCreators';
import Avatar from 'react-avatar';
import { SendAutoMessage } from './SendMessage';

function Users(props) {
  const [showDmPopup, setShowDmPopup] = useState(false);
  const [sendTo, setSendTo] = useState({});
  useEffect(() => {
    props.onUsersLoaded()
  }, []);

  function toggleDmPopup(id, name) {
    setSendTo({id: id, name: name})
    { showDmPopup ? setShowDmPopup(false) : setShowDmPopup(true) }
  }

  const allUsers = props.users.map((user) => {
    return (
        <div key={(user.id)} className="current-user" onClick={() => { toggleDmPopup(user.id, user.name) }}>
          {user.profile_pic === null
            ?
            <Avatar name={user.name} round={true} size={80} />
            :
            <Avatar id={user.id} src={user.profile_pic} referrerPolicy="no-referrer" className="rounded" size={80} />
          }
          <div className='text-secondary current-user-name'>{user.name}</div>
        </div>
    )
  })


  return (
    <div className="current-users">
       {showDmPopup ? <SendAutoMessage sendTo={sendTo} setShowDmPopup={setShowDmPopup}/> : ""}
      {allUsers}
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUsersLoaded: () => dispatch(actionCreators.fetchLoggedInUsers())
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Users)