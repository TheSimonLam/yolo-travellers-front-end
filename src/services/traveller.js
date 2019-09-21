export default class Traveller {

    static instance;

    constructor(){
        if(Traveller.instance){return Traveller.instance;}

        this.lambdaUrl = process.env.REACT_APP_LAMBDA_URL;
        
        Traveller.instance = this;
    }

    getTravellers = (userToken) => {
        return fetch(this.lambdaUrl + 'users/', {
            method: 'GET',
            headers: {
                'Authorization': userToken
            }
        }).then(response => response.json())
            .catch(err => {return err});
    };
}