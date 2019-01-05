export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            return {
                userToken: action.payload.userToken,
                homepageRedirect: action.payload.loggedIn,
                loggedIn: action.payload.loggedIn,
                message: action.payload.message
            };
        case 'SET_REGISTERED_USER':
            return {
                confirmationRedirect: action.payload.registered,
                message: action.payload.message
            };
        case 'SET_CURRENT_SESSION':
            return {
                userToken: action.payload.userToken
            };
        case 'SET_LOGGED_OUT_USER':
            return {};
        default:
            return state
    }
}