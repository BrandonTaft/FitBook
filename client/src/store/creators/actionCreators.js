

export const fetchThings= () => {

    return (dispatch) => {
        fetch('https://lit-ravine-06265.herokuapp.com/api/publicthings')
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
        fetch(`https://lit-ravine-06265.herokuapp.com/api/mythings/${user_Id}`)
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
        fetch(`https://lit-ravine-06265.herokuapp.com/api/getmail/${name}`)
        .then(response => response.json())
        .then(mail=> {
            dispatch({type: 'MAIL_LOADED', payload: mail})
        })
    }
}



// npm install redux-thunk