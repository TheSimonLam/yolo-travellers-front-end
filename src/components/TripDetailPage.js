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

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            trip: undefined
        };
        this.goToEditTripDetailPage = () => {
            this.props.history.push('/create-edit-trip/' + this.props.match.params.tripId);
        }
    }
    componentDidMount(){
        trip.retrieveTripDetailsByTripId(auth.userToken, this.props.match.params.tripId).then((res) => {
            this.setState({trip: res});
        }).catch((err) => {this.setState({trip: "none"});});
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }
        if (!this.state.trip) {
            return null;
        }
        if(this.state.trip === "none"){
            return <Redirect to='/no-trip-found' />
        }
        let editButton;
        if (auth.authEmail === this.state.trip.createdBy) {
            editButton = <button onClick={this.goToEditTripDetailPage}>Edit</button>;
        }
        return (
            <div className={"section"}>
                {editButton}
                <h1>Trip</h1>
                <div>Location: {this.state.trip.loc}</div>
                <div>Depart Date: {this.state.trip.departDate}</div>
                <div>Arrival Date: {this.state.trip.arrivalDate}</div>
                <div>Description: {this.state.trip.description}</div>
                <div>Tags: {this.state.trip.tags}</div>
                <div>Title: {this.state.trip.title}</div>
                <div>Solo: {this.state.trip.solo}</div>
                <div>Created By: {this.state.trip.createdBy}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);