import React, { Component } from "react";
import {Redirect} from "react-router-dom";

class Travellers extends Component {
    render() {
        if (!this.props.accountReducer.loggedIn) {
            return <Redirect to='/' />
        }
        return (
            <div>Travellers</div>
        );
    }
}

export default Travellers;