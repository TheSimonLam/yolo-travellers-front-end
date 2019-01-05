import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({

});

class Trips extends Component {
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <Redirect to='/' />
        }
        return (
            <div>Trips</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trips);