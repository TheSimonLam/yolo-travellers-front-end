import React, { Component } from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Auth from '../services/auth';
import Account from '../services/account';
import '../css/LoginRegisterPage.css';

const auth = new Auth();
const account = new Account();

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    registerUserDispatch: (authEmail, authName, pw) => {
        return auth.registerUser(authEmail, authName, pw).then(
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
    },
    loginUserDispatch(authEmail, pw) {
        return auth.loginUser(authEmail, pw).then((res) => {
            account.createUserIfNotExists(auth.userToken, auth.authName, auth.authEmail);
            dispatch({
                type: 'SET_LOGGED_IN_USER',
                payload: res
            });
        }).catch((err) => {
            dispatch({
                type: 'SET_LOGGED_IN_USER',
                payload: err});
        })
    }

});

class LoginRegister extends Component {
    constructor(){
        super();
        this.registerUser = (authEmail, authName, pw) => ev => {
            ev.preventDefault();
            this.props.registerUserDispatch(authEmail, authName, pw);
        };
        this.loginUser = (email, pw) => ev => {
            ev.preventDefault();
            this.props.loginUserDispatch(email, pw);
        }
    }
    render() {
        if (this.props.authReducer.homepageRedirect === true) {
            return <Redirect to='/' />
        }
        if (this.props.authReducer.confirmationRedirect === true) {
            return <Redirect to='/reg-conf' />
        }
        return (
            <div>
                {JSON.stringify(this.props.authReducer.message)}

                <div className={"section"}>
                    <h1 className={"register-heading"}>Register and explore the world!</h1>

                    <div className={"widget-container"}>
                        <div className={"widget-section"}>
                            <h2 className={"widget-heading"}>Register</h2>
                            <div className={"widget-form-section"}>
                                <div className={"widget-form-input-container"}><span>First Name: </span><input/></div>
                                <div className={"widget-form-input-container"}><span>Second Name: </span><input/></div>
                                <div className={"widget-form-input-container"}><span>Email: </span><input/></div>
                                <div className={"widget-form-input-container"}><span>Confirm Email: </span><input/></div>
                                <div className={"widget-form-input-container"}><span>Password: </span><input/></div>
                                <div className={"widget-form-input-container"}><span>Password Confirm: </span><input/></div>
                            </div>
                            <button onClick={this.registerUser("malnomis99@googlemail.com", "Simon Lam", "123passworD@")}>Click here to register</button>
                        </div>
                        <div className={"widget-section"}>
                            <h2 className={"widget-heading"}>Login</h2>
                            <div className={"widget-form-section"}>
                                <div className={"widget-form-input-container"}><span>Email: </span><input/></div>
                                <div className={"widget-form-input-container"}><span>Password: </span><input/></div>
                            </div>
                            <button onClick={this.loginUser("malnomis99@googlemail.com", "123passworD@")}>Click here to Login</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);