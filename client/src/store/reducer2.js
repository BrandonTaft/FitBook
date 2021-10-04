const initialState = {
    mail: [] 
}

const reducer2 = (state = initialState, action) => {
    switch(action.type) {
        case 'MAIL_LOADED': 
            return {
                ...state, 
                mail: action.payload
            }
        default: 
            return state 
    }
}

export default reducer2