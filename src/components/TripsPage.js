import React, { Component } from "react";
import {Redirect} from "react-router-dom";

class Trips extends Component {
    render() {
        if (!this.props.accountReducer.loggedIn) {
            return <Redirect to='/' />
        }
        return (
            <div>Trips</div>
        );
    }
}

export default Trips;