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

class Travellers extends Component {
    componentDidMount(){
        this.props.getCurrentSession();
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <Redirect to='/' />
        }
        return (
            <div>Travellers</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Travellers);