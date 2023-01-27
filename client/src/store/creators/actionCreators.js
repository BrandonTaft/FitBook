import history from "../History";
import Cookies from 'js-cookie';

export const fetchPublicPosts = () => {
  const token = Cookies.get('token');
  return (dispatch) => {
    fetch('/api/things', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(posts => {
        if (posts.success === false) {
          history.push('/')
        } else {
          dispatch({ type:'POSTS_LOADED', payload: posts })
        }
      })

  }
}


export const fetchMail = () => {
  return (dispatch) => {
    const name = Cookies.get('name')
    const token = Cookies.get('token');
    fetch(`/api/getmail/${name}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(mail => {
        if (mail.success === false) {
          history.push('/')
        } else {
          dispatch({ type: 'MAIL_LOADED', payload: mail })
        }
      })
  }
}

export const fetchAllUsers = () => {
  return (dispatch) => {
    const token = Cookies.get('token');
    fetch('/api/all-users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(allUsers => {
        if (allUsers.success === false) {
          history.push('/')
        } else {
          dispatch({ type: 'ALLUSERS_LOADED', payload: allUsers })
        }
      })
  }
}


export const fetchLoggedInUsers = () => {
  return (dispatch) => {
    const token = Cookies.get('token');
    fetch('/api/logged-in-users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(users => {
        if (users.success === false) {
          history.push('/')
        } else {
          dispatch({ type: 'USERS_LOADED', payload: users })
        }
      })
  }
}



