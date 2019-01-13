export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_RETRIEVED_TRIP_DETAILS':
            return {
                loc: action.payload.loc,
                departDate: action.payload.departDate,
                arrivalDate: action.payload.arrivalDate,
                description: action.payload.description,
                tags: action.payload.tags,
                title: action.payload.title,
                solo: action.payload.solo,
                createdBy: action.payload.createdBy
            };
        default:
            return state
    }
}