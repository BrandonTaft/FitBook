const initialState = {
    posts: [],
    mail: [],
    users: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'POSTS_LOADED':
            return {
                ...state,
                posts: action.payload
            }
        case 'USERS_LOADED':
            return {
                ...state,
                users: action.payload
            }
        case 'MAIL_LOADED':
            return {
                ...state,
                mail: action.payload
            }
        default:
            return state
    }
}

export default reducer 