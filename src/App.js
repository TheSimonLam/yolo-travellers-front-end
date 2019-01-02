import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Account from './services/account';
import './App.css';
import Home from './components/Home';
import Profile from './components/Profile';
import Travellers from './components/Travellers';
import Trips from './components/Trips';
import LoginRegister from './components/LoginRegister';

const account = new Account();

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    getCurrentSession(){
        return account.getCurrentSession().then(
            res => dispatch({
                type: 'SET_CURRENT_SESSION',
                payload: res
            })
        )
    },
    logoutUserDispatch(){
        account.logoutUser();
        dispatch({
            type: 'SET_LOGGED_OUT_USER',
            payload: {}
        })
    }
})

class App extends Component {
    constructor(){
        super();
        this.logoutUser = () => ev => {
            ev.preventDefault();
            this.props.logoutUserDispatch();
        };
    }
    componentDidMount(){
        this.props.getCurrentSession();
    }
    render() {
        const isLoggedIn = this.props.accountReducer.userAttributes;
        let navLinks;

        if(isLoggedIn){
            navLinks = <ul className={'nav-bar-unordered-list'}>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to="/">Home</Link>
                </li>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to="/profile">Profile</Link>
                </li>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to="/travellers">Travellers</Link>
                </li>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to="/trips">Trips</Link>
                </li>
                <li className={'nav-bar-unordered-list-item hover-hand'} onClick={this.logoutUser()}>Sign Out</li>
            </ul>
        }
        else{
            navLinks = <ul className={'nav-bar-unordered-list'}>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to="/">Home</Link>
                </li>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to="/login-register">Login/Register</Link>
                </li>
            </ul>
        }

        return (
            <Router>
                <div>
                    <div className={'nav-bar-container'}>
                        <div className={'header-logo-container'}>
                            <img src={require('./assets/yt-logo.png')} alt={''}/>
                        </div>
                        {navLinks}
                    </div>

                    <Route exact path="/" component={Home} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/travellers" component={Travellers} />
                    <Route path="/trips" component={Trips} />
                    <Route path="/login-register" component={LoginRegister} />
                </div>
            </Router>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);