import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import Auth from "../services/auth";
import Account from "../services/account";

const auth = new Auth();
const account = new Account();

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
    setTotalNumberOfTravellers(){
        return auth.getCurrentSession().then(
            res => dispatch({
                type: 'SET_TOTAL_NUMBER_OF_TRAVELLERS',
                payload: res
            })
        )
    }
});

class Travellers extends Component {
    componentDidMount(){
        this.props.getCurrentSession().then(() => {
            account.getTotalNumberOfTravellers(auth.userToken).then((res) => {
                this.props.setTotalNumberOfTravellers(res)
            });
        });
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }
        return (
            <div>{JSON.stringify(this.props.totalNumberOfTravellers)}</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Travellers);