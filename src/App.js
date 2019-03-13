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

                    <div className={"footer"}>
                        <div className={"footer-container"}>
                            <div className={"footer-logo-container"}>
                                <a className={"footer-social-logo"} href={"http://www.yolo.com"}><img src={require("./assets/social-media/facebook.png")}/></a>
                                <a className={"footer-social-logo"} href={"http://www.yolo.com"}><img src={require("./assets/social-media/instagram.png")}/></a>
                                <a className={"footer-social-logo"} href={"http://www.yolo.com"}><img src={require("./assets/social-media/linkedin.png")}/></a>
                                <a className={"footer-social-logo"} href={"http://www.yolo.com"}><img src={require("./assets/social-media/snapchat.png")}/></a>
                                <a className={"footer-social-logo"} href={"http://www.yolo.com"}><img src={require("./assets/social-media/twitter.png")}/></a>
                                <a className={"footer-social-logo"} href={"http://www.yolo.com"}><img src={require("./assets/social-media/youtube.png")}/></a>
                            </div>
                            <div className={"footer-site-links-container"}>
                                <div className={"footer-site-links"}>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Berlin is a nice place</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Where's hot right now?</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Take me on a journey</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>I wanna go on holiday</a>
                                </div>
                                <div className={"footer-site-links"}>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>I wanna go on holiday</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Berlin is a nice place</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Take me on a journey</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Where's hot right now?</a>
                                </div>
                                <div className={"footer-site-links"}>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Where's hot right now?</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>I wanna go on holiday</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Berlin is a nice place</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Take me on a journey</a>
                                </div>
                                <div className={"footer-site-links"}>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Take me on a journey</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Where's hot right now?</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>I wanna go on holiday</a>
                                    <a className={"footer-site-link"} href={"http://www.yolo.com"}>Berlin is a nice place</a>
                                </div>
                            </div>
                            <div className={"footer-info"}>
                                <img className={"footer-logo"} src={require("./assets/yt-logo.png")}/>
                                <span className={"footer-text"}>Yolo Travellers (c) 2019 - All Rights Reserved.</span>
                            </div>
                        </div>
                    </div>
                </div>

            </Router>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);