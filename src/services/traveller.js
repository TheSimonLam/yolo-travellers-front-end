export default class Traveller {

    static instance;

    constructor(){
        if(Traveller.instance){return Traveller.instance;}

        if(process.env.NODE_ENV === "production"){
            this.lambdaUrl = 'PROD URL GOES HERE!';
        }
        else{
            this.lambdaUrl = 'https://oy3ujiyqf4.execute-api.us-east-1.amazonaws.com/dev/';
        }

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