export default class Account {

    static instance;

    constructor(){
        if(Account.instance){return Account.instance;}

        this.lambdaUrl = 'https://oy3ujiyqf4.execute-api.us-east-1.amazonaws.com/dev/';
        this.birthday = '';
        this.gender = '';
        this.homeCountry = '';
        this.currentCountry = '';
        this.instagramHandle = '';
        this.twitterHandle = '';
        this.youtubeUrl = '';
        this.websiteUrl = '';
        this.available = '';
        this.bio = '';

        Account.instance = this;
    }

    handleTokenExpired = () => {
        //TODO: if response is the below, then sign the user out
        // {
        //     "message": "The incoming token has expired"
        // }
    }


    createUserIfNotExists = async (userToken, authName, authEmail) => {
        const rawResponse = await fetch(this.lambdaUrl + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify({email: authEmail, name: authName})
        });
        const content = await rawResponse.json();
        return content;
    };

    setUserDetails = (details) => {

    }
}