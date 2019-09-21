export default class Trip {

    static instance;

    constructor(){
        if(Trip.instance){return Trip.instance;}

        this.lambdaUrl = process.env.REACT_APP_LAMBDA_URL;

        Trip.instance = this;
    }

    getTrips = (userToken) => {
        return fetch(this.lambdaUrl + 'trips/', {
            method: 'GET',
            headers: {
                'Authorization': userToken
            }
        }).then(response => response.json())
            .catch(err => {return err});
    };

    retrieveTripDetailsByTripId = (userToken, tripId) => {
        return fetch(this.lambdaUrl + 'trips/' + tripId, {
            method: 'GET',
            headers: {
                'Authorization': userToken
            }
        }).then(response => response.json())
            .catch(err => {return err});
    };

    createTrip = async (userToken, tripDetails) => {
        return fetch(this.lambdaUrl + 'trips/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify(tripDetails)
        }).then(response => response.json())
            .catch(err => err);
    };

    updateTrip = (userToken, tripId, tripDetails) => {
        return fetch(this.lambdaUrl + 'trips/' + tripId, {
            method: 'PUT',
            headers: {
                'Authorization': userToken
            },
            body: JSON.stringify(tripDetails)
        }).then(response => response.json())
            .catch(err => {return err});
    };
}