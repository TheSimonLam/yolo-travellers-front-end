import React, { Component } from "react";
import Account from "../services/account";
import Auth from "../services/auth";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import '../css/ProfilePage.css';

const account = new Account();
const auth = new Auth();

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setRetrievedAccountDetails(res){
        if(!res.message){
            dispatch({
                type: 'SET_RETRIEVED_ACCOUNT_DETAILS',
                payload: {
                    name: res.name, email: res.email, birthday: res.birthday, gender: res.gender,
                    homeCountry: res.homeCountry, currentCountry: res.currentCountry, instagramHandle: res.instagramHandle,
                    twitterHandle: res.twitterHandle, youtubeUrl: res.youtubeUrl, websiteUrl: res.websiteUrl,
                    available: res.available, bio: res.bio
                }
            })
        }
        else{
            dispatch({
                type: 'SET_NO_ACCOUNT_FOUND',
                payload: {noAccFound: true}
            })
        }

    },
    getCurrentSession(){
        return auth.getCurrentSession().then(
            res => dispatch({
                type: 'SET_CURRENT_SESSION',
                payload: res
            })
        )
    }
});

class Profile extends Component {
    componentDidMount(){
        this.props.getCurrentSession().then(() => {
            account.retrieveAccountDetailsByAuthEmail(auth.userToken, this.props.match.params.authEmail).then((res) => {
                this.props.setRetrievedAccountDetails(res);
            }).catch((err) => {console.log(err);});
        });

        this.goToEditProfilePage = () => {
            this.props.history.push('/edit-profile/' + this.props.match.params.authEmail);
        }
    }
    getProfilePicUrl = () => {
        account.getUserProfileImage(auth.userToken, this.props.match.params.authEmail).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }
        if (this.props.accountReducer.noAccFound) {
            return <Redirect to='/no-account-found' />
        }
        return (
            <div>
                <button onClick={this.goToEditProfilePage}>Edit</button>
                <h1>Profile</h1>
                <div className={"profile-image-container"} onClick={this.goToEditProfilePage}>
                    <img className={"profile-image"} src={this.getProfilePicUrl()} alt="profile-pic"/>
                </div>
                <div>Name: {this.props.accountReducer.name}</div>
                <div>Email: {this.props.accountReducer.email}</div>
                <div>Birthday: {this.props.accountReducer.birthday}</div>
                <div>Gender: {this.props.accountReducer.gender}</div>
                <div>Home Country: {this.props.accountReducer.homeCountry}</div>
                <div>Current Country: {this.props.accountReducer.currentCountry}</div>
                <div>Instagram: {this.props.accountReducer.instagramHandle}</div>
                <div>Twitter: {this.props.accountReducer.twitterHandle}</div>
                <div>YouTube: {this.props.accountReducer.youtubeUrl}</div>
                <div>Website: {this.props.accountReducer.websiteUrl}</div>
                <div>Available: {this.props.accountReducer.available}</div>
                <div>Bio: {this.props.accountReducer.bio}</div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);