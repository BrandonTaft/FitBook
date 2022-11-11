import history from "../History"

export const fetchThings= () => {
    const token = localStorage.getItem('jsonwebtoken')

    return (dispatch) => {
         fetch('https://lit-ravine-06265.herokuapp.com/api/things',{

            method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(things=> {
            if (things.success === false) {
                console.log(false)
                history.push('/')
          }else{
            console.log("things", things)
            dispatch({type: 'THINGS_LOADED', payload: things})
          }
        })

    }
}

export const fetchMyThings= () => {

    return (dispatch) => {
        const user_Id = localStorage.getItem('user_Id')
        const token = localStorage.getItem('jsonwebtoken')
        console.log(user_Id)
        fetch(`https://lit-ravine-06265.herokuapp.com/api/mythings/${user_Id}`,{
           
            method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(things=> {
            if (things.success === false) {
                console.log(false)
                history.push('/')
          }else{
            dispatch({type: 'THINGS_LOADED', payload: things})
          }
        })

    }
}

export const fetchMyMail= () => {

    return (dispatch) => {
        const name = localStorage.getItem('name')
        const token = localStorage.getItem('jsonwebtoken')
       fetch(`https://lit-ravine-06265.herokuapp.com/api/getmail/${name}`,{

            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then(response => response.json())
        .then(mail=> {
            if (mail.success === false) {
                console.log(false)
                history.push('/')
          }else{
            dispatch({type: 'MAIL_LOADED', payload: mail})
          }
        })
    }
}



