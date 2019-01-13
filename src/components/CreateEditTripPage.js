import React, { Component } from "react";
import Trip from "../services/trip";
import Auth from "../services/auth";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const trip = new Trip();
const auth = new Auth();

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getCurrentSession(){
        return auth.getCurrentSession().then(
            res => dispatch({
                type: 'SET_CURRENT_SESSION',
                payload: res
            })
        )
    },
    setRetrievedTripDetails(res){
        if(!res.message){
            dispatch({
                type: 'SET_RETRIEVED_TRIP_DETAILS',
                payload: {
                    loc: res.loc, departDate: res.departDate, arrivalDate: res.arrivalDate,
                    description: res.description, tags: res.tags, title: res.title, solo: res.solo, createdBy: res.createdBy
                }
            })
        }
        else{
            dispatch({
                type: 'SET_NO_TRIP_FOUND',
                payload: {noTripFound: true}
            })
        }
    },
});

class CreateEditTrip extends Component {
    componentDidMount(){
        this.props.getCurrentSession().then(() => {
            if(this.props.match.params.tripId){
                trip.retrieveTripDetailsByTripId(auth.userToken, this.props.match.params.tripId).then((res) => {
                    this.props.setRetrievedTripDetails(res);
                }).catch((err) => {console.log(err);});
            }
        });

        this.onDetailsInput = (evt) => {
            this.props.tripReducer[evt.target.name] = evt.target.value;
        };

        this.validateDetails = () => {
            let validation = {valid: true, errors: ''};
            //TODO: validate this.props.tripsReducer variables
            return validation;
        };

        this.saveTripData = () => {
            const validCheck = this.validateDetails(this.props.tripReducer);
            if(validCheck.valid){
                if(this.props.match.params.tripId){
                    trip.updateTrip(auth.userToken, this.props.match.params.tripId, this.props.tripReducer).then((res) => {
                        this.props.history.push('/trips/' + this.props.match.params.tripId);
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                else{
                    trip.createTrip(auth.userToken, this.props.tripReducer).then((res) => {
                        this.props.history.push('/trips/' + res.tripId);
                    }).catch((err) => {
                        console.log(err);
                    })
                }

            }
            else{
                console.log('false');
                console.log(validCheck.errors);
            }
        }
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }
        if (this.props.accountReducer.noAccFound) {
            return <Redirect to='/no-account-found' />
        }
        return (
            <div>
                {this.props.match.params.tripId ? (
                    <h1>Edit Trip</h1>
                ) : (
                    <h1>Create Trip</h1>
                )}
                <div>Location: <input name="loc" onChange={this.onDetailsInput} defaultValue={this.props.tripReducer.loc}/></div>
                <div>Depart Date: <input name="departDate" onChange={this.onDetailsInput} defaultValue={this.props.tripReducer.departDate}/></div>
                <div>Arrival Date: <input name="arrivalDate" onChange={this.onDetailsInput} defaultValue={this.props.tripReducer.arrivalDate}/></div>
                <div>Description: <input name="description" onChange={this.onDetailsInput} defaultValue={this.props.tripReducer.description}/></div>
                <div>Tags: <input name="tags" onChange={this.onDetailsInput} defaultValue={this.props.tripReducer.tags}/></div>
                <div>Title: <input name="title" onChange={this.onDetailsInput} defaultValue={this.props.tripReducer.title}/></div>
                <div>Solo: <input name="solo" onChange={this.onDetailsInput} defaultValue={this.props.tripReducer.solo}/></div>

                <button onClick={this.saveTripData}>Save</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditTrip);