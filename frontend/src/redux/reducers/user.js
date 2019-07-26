function userReducer(state = {}, action) {
    switch (action.type) {
        case 'REGISTER':
            return {
                ...state,
                user:action.payload
            };
        case 'LOGIN':
            return{
                ...state,
                user:action.payload,
            };
        case 'LOGOUT':
            return{
               localStorage: action.payload
            }
        case 'GET_ALL':
            return {
                ...state,
                users:action.payload
            };
        case 'EDIT_NAME':
            return{
                user: action.payload
            }

        default:
            return state
    }
}

export default userReducer;