export default (state = {}, action) => {
    switch (action.type) {
        case 'SET_RETRIEVED_ACCOUNT_DETAILS':
            return {
                name: action.payload.name,
                email: action.payload.email,
                birthday: action.payload.birthday,
                gender: action.payload.gender,
                homeCountry: action.payload.homeCountry,
                currentCountry: action.payload.currentCountry,
                instagramHandle: action.payload.instagramHandle,
                twitterHandle: action.payload.twitterHandle,
                youtubeUrl: action.payload.youtubeUrl,
                websiteUrl: action.payload.websiteUrl,
                available: action.payload.available,
                bio: action.payload.bio
            };
        default:
            return state
    }
}