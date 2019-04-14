import React, { Component } from "react";
import {connect} from "react-redux";
import Auth from "../services/auth";
import Trip from "../services/trip";

const auth = new Auth();
const trip = new Trip();

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
    setTrips(){
        return trip.getTrips(auth.userToken).then(
            res => dispatch({
                type: 'SET_TRIPS',
                payload: res
            })
        )
    }
});

class Trips extends Component {
    componentDidMount(){
        this.props.getCurrentSession().then(() => {
            this.props.setTrips(auth.userToken);
        });

        this.goToCreateEditTrip = () => {
            this.props.history.push('/create-edit-trip');
        }
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }
        return (
            <div className={"section"}>
                <button onClick={this.goToCreateEditTrip}>Create Trip</button>
                {JSON.stringify(this.props.tripsReducer.trips)}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trips);