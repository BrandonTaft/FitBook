import history from "../History"

export const fetchPublicPosts = () => {
  const token = localStorage.getItem('token')
  return (dispatch) => {
    fetch('http://127.0.0.1:8080/api/things', {
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
    const name = localStorage.getItem('name')
    const token = localStorage.getItem('token')
    fetch(`http://127.0.0.1:8080/api/getmail/${name}`, {
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


export const fetchLoggedInUsers = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    fetch('http://127.0.0.1:8080/api/logged-in-users', {
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



