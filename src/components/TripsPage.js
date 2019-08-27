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

});

class Trips extends Component {
    constructor(){
        super();
        this.state = {
            trips: []
        };
    }
    componentDidMount(){
        trip.getTrips(auth.userToken).then((res) => {
            this.setState({trips: res});
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
                {JSON.stringify(this.state.trips)}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trips);