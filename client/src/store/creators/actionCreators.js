import history from "../History"

export const fetchThings = () => {
  const token = localStorage.getItem('jsonwebtoken')
  return (dispatch) => {
    fetch('http://127.0.0.1:8080/api/things', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(things => {
        if (things.success === false) {
          history.push('/')
        } else {
          dispatch({ type: 'THINGS_LOADED', payload: things })
        }
      })

  }
}

export const fetchMyThings = () => {
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
      .then(things => {
        if (things.success === false) {
          history.push('/')
        } else {
          dispatch({ type: 'THINGS_LOADED', payload: things })
        }
      })
  }
}

export const fetchMyMail = () => {
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
        console.log(mail,"mail")
        if (mail.success === false) {
          history.push('/')
        } else {
          dispatch({ type: 'MAIL_LOADED', payload: mail })
        }
      })
  }
}



