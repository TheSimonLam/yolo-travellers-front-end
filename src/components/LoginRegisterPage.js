import React, { Component } from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Auth from '../services/auth';
import '../css/LoginRegisterPage.css';

const auth = new Auth();

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
        if (this.props.authReducer.loggedIn) {
            return <Redirect to='/' />
        }
        if (this.props.authReducer.homepageRedirect === true) {
            return <Redirect to='/' />
        }
        if (this.props.authReducer.confirmationRedirect === true) {
            return <Redirect to='/reg-conf' />
        }
        return (
            <div className={"section"}>
                {JSON.stringify(this.props.authReducer.message)}

                <h1 className={"register-heading"}>Register and explore the world!</h1>

                <div className={"widget-container"}>
                    <div className={"widget-section"}>
                        <h2 className={"widget-heading"}>Register</h2>
                        <div className={"widget-form__section"}>
                            <div className={"widget-form__input-container"}><span>First Name: </span><input className={"widget-input"}/></div>
                            <div className={"widget-form__input-container"}><span>Second Name: </span><input className={"widget-input"}/></div>
                            <div className={"widget-form__input-container"}><span>Email: </span><input className={"widget-input"}/></div>
                            <div className={"widget-form__input-container"}><span>Confirm Email: </span><input className={"widget-input"}/></div>
                            <div className={"widget-form__input-container"}><span>Password: </span><input className={"widget-input"}/></div>
                            <div className={"widget-form__input-container"}><span>Password Confirm: </span><input className={"widget-input"}/></div>
                        </div>
                        <button className={"widget-form__button"} onClick={this.registerUser("malnomis99@googlemail.com", "Simon Lam", "123passworD@")}>Register</button>
                    </div>
                    <div className={"widget-section"}>
                        <h2 className={"widget-heading"}>Login</h2>
                        <div className={"widget-form__section"}>
                            <div className={"widget-form__input-container"}><span>Email: </span><input className={"widget-input"}/></div>
                            <div className={"widget-form__input-container"}><span>Password: </span><input className={"widget-input"}/></div>
                        </div>
                        <button className={"widget-form__button"} onClick={this.loginUser("malnomis99@googlemail.com", "123passworD@")}>Login</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);