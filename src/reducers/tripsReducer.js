export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_TRIPS':
            return {
                trips: action.payload
            };
        case 'SET_NO_TRIP_FOUND':
            return {
                noTripFound: action.payload.noTripFound,
            };
        default:
            return state
    }
}