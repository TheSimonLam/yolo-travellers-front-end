export default class Account {

    static instance;

    constructor(){
        if(Account.instance){return Account.instance;}

        this.lambdaUrl = process.env.REACT_APP_LAMBDA_URL;

        Account.instance = this;
    }

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