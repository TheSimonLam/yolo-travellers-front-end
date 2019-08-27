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

});

class CreateEditTrip extends Component {
    constructor(props){
        super(props);
        this.state = {
            trip: undefined
        };
        this.onDetailsInput = (evt) => {
            let trip = this.state.trip;
            trip[evt.target.name] = evt.target.value;
            this.setState(trip);
        };

        this.validateDetails = () => {
            let validation = {valid: true, errors: ''};
            return validation;
        };

        this.saveTripData = () => {
            const validCheck = this.validateDetails(this.state.trip);
            if(validCheck.valid){
                if(this.props.match.params.tripId){
                    trip.updateTrip(auth.userToken, this.props.match.params.tripId, this.state.trip).then((res) => {
                        this.props.history.push('/trips/' + this.props.match.params.tripId);
                    }).catch((err) => {
                        console.log(err);
                    })
                }
                else{
                    trip.createTrip(auth.userToken, this.state.trip).then((res) => {
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
    componentDidMount(){
        if(this.props.match.params.tripId){
            trip.retrieveTripDetailsByTripId(auth.userToken, this.props.match.params.tripId).then((res) => {
                this.setState({trip: res});
            }).catch((err) => {this.setState({trips: "none"});});
        }
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }
        if (!this.state.trip) {
            return null
        }
        if(this.state.trip === "none"){
            return <Redirect to='/no-trip-found' />
        }
        return (
            <div className={"section"}>
                {this.props.match.params.tripId ? (
                    <h1>Edit Trip</h1>
                ) : (
                    <h1>Create Trip</h1>
                )}
                <div>Location: <input name="loc" onChange={this.onDetailsInput} defaultValue={this.state.trip.loc}/></div>
                <div>Depart Date: <input name="departDate" onChange={this.onDetailsInput} defaultValue={this.state.trip.departDate}/></div>
                <div>Arrival Date: <input name="arrivalDate" onChange={this.onDetailsInput} defaultValue={this.state.trip.arrivalDate}/></div>
                <div>Description: <input name="description" onChange={this.onDetailsInput} defaultValue={this.state.trip.description}/></div>
                <div>Tags: <input name="tags" onChange={this.onDetailsInput} defaultValue={this.state.trip.tags}/></div>
                <div>Title: <input name="title" onChange={this.onDetailsInput} defaultValue={this.state.trip.title}/></div>
                <div>Solo: <input name="solo" onChange={this.onDetailsInput} defaultValue={this.state.trip.solo}/></div>

                <button onClick={this.saveTripData}>Save</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditTrip);