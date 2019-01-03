import React, { Component } from "react";
import Account from "../services/account";
import {connect} from "react-redux";

const account = new Account();

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    registerUserDispatch: (email, name, pw) => {
        return account.registerUser(email, name, pw).then(
            res => {
                dispatch({
                    type: 'SET_REGISTERED_USER',
                    payload: res});
            },
            err => {
                dispatch({
                    type: 'SET_REGISTERED_USER',
                    payload: err});
            }
        )
    }
});

class Profile extends Component {
    render() {
        return (
            <div>
                <h1>Profile</h1>
                <div>Instagram: {JSON.stringify(this.props.accountReducer)}</div>
                <div>Name: {JSON.stringify(this.props.accountReducer.name)}</div>
                <div>Email: {JSON.stringify(this.props.accountReducer.email)}</div>
                <div>Birthday: {JSON.stringify(this.props.accountReducer.birthday)}</div>
                <div>Gender: {JSON.stringify(this.props.accountReducer.gender)}</div>
                <div>Home Country: {JSON.stringify(this.props.accountReducer.homeCountry)}</div>
                <div>Current Country: {JSON.stringify(this.props.accountReducer.currentCountry)}</div>
                <div>Instagram: {JSON.stringify(this.props.accountReducer.instagramHandle)}</div>
                <div>Twitter: {JSON.stringify(this.props.accountReducer.twitterHandle)}</div>
                <div>YouTube: {JSON.stringify(this.props.accountReducer.youtubeUrl)}</div>
                <div>Website: {JSON.stringify(this.props.accountReducer.websiteUrl)}</div>
                <div>Available: {JSON.stringify(this.props.accountReducer.available)}</div>
                <div>Bio: {JSON.stringify(this.props.accountReducer.bio)}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);