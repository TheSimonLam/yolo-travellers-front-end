import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Auth from "../services/auth";

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
    }
});

class Trips extends Component {
    componentDidMount(){
        this.props.getCurrentSession().then(() => {
            //TODO: Do stuff after getting session
        });
    }
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