const initialState = {
    things: [] 
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'THINGS_LOADED': 
            return {
                ...state, 
                things: action.payload
            }
        default: 
            return state 
    }
}

export default reducer 