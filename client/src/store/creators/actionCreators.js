

export const fetchThings= () => {

    return (dispatch) => {
        fetch('http://localhost:8080/api/publicthings')
        .then(response => response.json())
        .then(things=> {
            dispatch({type: 'THINGS_LOADED', payload: things})
        })
    }
}

export const fetchMyThings= () => {

    return (dispatch) => {
        const user_Id = localStorage.getItem('user_Id')
        console.log(user_Id)
        fetch(`http://localhost:8080/api/mythings/${user_Id}`)
        .then(response => response.json())
        .then(things=> {
            dispatch({type: 'THINGS_LOADED', payload: things})
        })
    }
}

export const fetchMyMail= () => {

    return (dispatch) => {
        const name = localStorage.getItem('name')
        console.log(name)
        fetch(`http://localhost:8080/api/getmail/${name}`)
        .then(response => response.json())
        .then(mail=> {
            dispatch({type: 'MAIL_LOADED', payload: mail})
        })
    }
}



// npm install redux-thunk