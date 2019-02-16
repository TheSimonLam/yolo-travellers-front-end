import React, { Component } from "react";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Auth from './services/auth';
import './css/App.css';
import Home from './components/HomePage';
import Profile from './components/ProfilePage';
import EditProfile from './components/EditProfilePage';
import Travellers from './components/TravellersPage';
import Trips from './components/TripsPage';
import Trip from './components/TripPage';
import LoginRegister from './components/LoginRegisterPage';
import RegConfirmPage from './components/RegConfirmPage';
import NoAccountFound from './components/NoAccountFound';
import NoTripFound from './components/NoTripFound';
import CreateEditTrip from './components/CreateEditTripPage';

const auth = new Auth();

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    logoutUserDispatch(){
        auth.logoutUser();
        dispatch({
            type: 'SET_LOGGED_OUT_USER',
            payload: {}
        })
    }
});

class App extends Component {
    constructor(){
        super();
        this.logoutUser = () => ev => {
            ev.preventDefault();
            this.props.logoutUserDispatch();
        };
    }
    render() {
        let isLoggedIn = this.props.authReducer.userToken;
        let profileLink = "/profile/" + auth.authEmail;
        let navLinks;

        if(isLoggedIn){
            navLinks = <ul className={'nav-bar-unordered-list'}>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to="/">Home</Link>
                </li>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to={profileLink}>Profile</Link>
                </li>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to="/travellers">Travellers</Link>
                </li>
                <li className={'nav-bar-unordered-list-item'}>
                    <Link to="/all-trips">Trips</Link>
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
                        <div className={'nav-bar-wrapper'}>
                            <div className={'header-logo-container'}>
                                <img className={'logo-image'} src={require('./assets/yt-logo.png')} alt={''}/>
                            </div>
                            <div className={'links-container'}>
                                {navLinks}
                            </div>
                        </div>
                    </div>

                    <Route exact path="/" component={Home} />
                    <Route path="/profile/:authEmail" component={Profile} />
                    <Route path="/edit-profile/:authEmail" component={EditProfile} />
                    <Route path="/travellers" component={Travellers} />
                    <Route path="/trips/:tripId" component={Trip} />
                    <Route path="/all-trips/" component={Trips} />
                    <Route path="/login-register" component={LoginRegister} />
                    <Route path="/reg-conf" component={RegConfirmPage} />
                    <Route path="/no-account-found" component={NoAccountFound} />
                    <Route path="/no-trip-found" component={NoTripFound} />
                    <Route path="/create-edit-trip/:tripId?" component={CreateEditTrip} />
                </div>

            </Router>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);