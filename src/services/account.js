export default class Account {

    static instance;

    constructor(){
        if(Account.instance){return Account.instance;}

        if(process.env.NODE_ENV === "production"){
            this.lambdaUrl = 'PROD URL GOES HERE!';
        }
        else{
            this.lambdaUrl = 'https://7leo8yxg49.execute-api.us-east-1.amazonaws.com/dev/';
        }

        Account.instance = this;
    }

    createUserIfNotExists = async (userToken, authName, authEmail) => {
        return fetch(this.lambdaUrl + 'users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify({email: authEmail, name: authName})
        }).then(response => response.json())
            .catch(err => err);
    };

    setUserProfileDetails = (userToken, authEmail, details) => {
        return fetch(this.lambdaUrl + 'users/' + authEmail, {
            method: 'PUT',
            headers: {
                'Authorization': userToken
            },
            body: JSON.stringify(details)
        }).then(response => response.json())
            .catch(err => {return err});
    };

    uploadUserProfileImage = (userToken, authEmail, img) => {
        return fetch(this.lambdaUrl + 'users/images/' + authEmail, {
            method: 'POST',
            headers: {
                'Authorization': userToken
            },
            body: img
        }).then(response => response.json())
            .catch(err => {return err});
    };

    getUserProfileImage = (userToken, email) => {
        return fetch(this.lambdaUrl + 'users/images/' + email, {
            method: 'GET',
            headers: {
                'Authorization': userToken
            }
        }).then(response => response.json())
            .catch(err => {return err});
    };

    retrieveAccountDetailsByAuthEmail = (userToken, authEmail) => {
        return fetch(this.lambdaUrl + 'users/' + authEmail, {
            method: 'GET',
            headers: {
                'Authorization': userToken
            }
        }).then(response => response.json())
            .catch(err => {return err});
    };

    handleTokenExpired = () => {
        //TODO: if response is the below, then sign the user out
        // {
        //     "message": "The incoming token has expired"
        // }
    };


}