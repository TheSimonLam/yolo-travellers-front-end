import React, { Component } from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Account from '../services/account';

const account = new Account();

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    registerUserDispatch: (email, name, pw) => {
        account.registerUser(email, name, pw);
        //TODO: redirect to confirmation page
    },
    loginUserDispatch(email, pw){
        return account.loginUser(email, pw).then(
            res => {
                dispatch({
                type: 'SET_LOGGED_IN_USER',
                payload: res});
            }
        )
    }
});

class LoginRegister extends Component {
    constructor(){
        super();
        this.registerUser = (email, name, pw) => ev => {
            ev.preventDefault();
            this.props.registerUserDispatch(email, name, pw);
        };
        this.loginUser = (email, pw) => ev => {
            ev.preventDefault();
            this.props.loginUserDispatch(email, pw);
        }
    }
    render() {
        if (this.props.accountReducer.homepageRedirect === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <button onClick={this.registerUser("malnomis99@gmail.com", "Simon Lam", "123passworD@")}>Click here to register</button>
                <button onClick={this.loginUser("malnomis99@gmail.com", "123passworD@")}>Click here to Login</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);