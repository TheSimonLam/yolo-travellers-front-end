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
    getCurrentSession(){
        return auth.getCurrentSession().then(
            res => dispatch({
                type: 'SET_CURRENT_SESSION',
                payload: res
            })
        )
    }
});

class Profile extends Component {
    componentDidMount(){
        this.props.getCurrentSession().then(() => {
            trip.retrieveTripDetailsByTripId(auth.userToken, this.props.match.params.tripId).then((res) => {
                this.props.setRetrievedTripDetails(res);
            }).catch((err) => {console.log(err);});
        });

        this.goToEditTripPage = () => {
            this.props.history.push('/create-edit-trip/' + this.props.match.params.tripId);
        }
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }
        if (this.props.tripsReducer.noTripFound) {
            return <Redirect to='/no-trip-found' />
        }
        let editButton;
        if (auth.authEmail === this.props.tripReducer.createdBy) {
            editButton = <button onClick={this.goToEditTripPage}>Edit</button>;
        }
        return (
            <div>
                {editButton}
                <h1>Trip</h1>
                <div>Location: {this.props.tripReducer.loc}</div>
                <div>Depart Date: {this.props.tripReducer.departDate}</div>
                <div>Arrival Date: {this.props.tripReducer.arrivalDate}</div>
                <div>Description: {this.props.tripReducer.description}</div>
                <div>Tags: {this.props.tripReducer.tags}</div>
                <div>Title: {this.props.tripReducer.title}</div>
                <div>Solo: {this.props.tripReducer.solo}</div>
                <div>Created By: {this.props.tripReducer.createdBy}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);