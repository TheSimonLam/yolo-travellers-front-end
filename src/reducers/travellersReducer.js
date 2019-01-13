export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_TRAVELLERS':
            return {
                travellers: action.payload
            };
        default:
            return state
    }
}