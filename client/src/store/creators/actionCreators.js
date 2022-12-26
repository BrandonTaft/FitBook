import Users from "../../components/Users"
import history from "../History"

export const fetchPublicPosts = () => {
  const token = localStorage.getItem('jsonwebtoken')
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
          history.push('/feed')
        } else {
          dispatch({ type:'POSTS_LOADED', payload: posts })
        }
      })

  }
}

export const fetchMyPosts = () => {
  return (dispatch) => {
    const user_Id = localStorage.getItem('user_Id')
    const token = localStorage.getItem('jsonwebtoken')
    fetch(`http://127.0.0.1:8080/api/mythings/${user_Id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(myPosts => {
        if (myPosts.success === false) {
          history.push('/feed')
        } else {
          dispatch({ type:'POSTS_LOADED', payload: myPosts })
        }
      })
  }
}

export const fetchMail = () => {
  return (dispatch) => {
    const name = localStorage.getItem('name')
    const token = localStorage.getItem('jsonwebtoken')
    fetch(`http://127.0.0.1:8080/api/getmail/${name}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(mail => {
          dispatch({ type: 'MAIL_LOADED', payload: mail })
      })
  }
}

export const fetchAllUsers = () => {
  return (dispatch) => {
    const token = localStorage.getItem('jsonwebtoken')
    fetch('http://127.0.0.1:8080/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(users => {
          dispatch({ type: 'USERS_LOADED', payload: users })
      })
  }
}



