export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN_USER':
            return {
                accessToken: action.payload.accessToken,
                userAttributes: action.payload.userAttributes,
                homepageRedirect: true
            };
        case 'SET_CURRENT_SESSION':
            return {
                accessToken: action.payload.accessToken,
                userAttributes: action.payload.userAttributes
            };
        case 'SET_LOGGED_OUT_USER':
            return {};
        default:
            return state
    }
}