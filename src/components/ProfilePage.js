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

});

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            details: undefined
        }

        this.goToEditProfilePage = () => {
            this.props.history.push('/edit-profile/' + this.props.match.params.authEmail);
        }
    }
    componentDidMount(){
        account.retrieveAccountDetailsByAuthEmail(auth.userToken, this.props.match.params.authEmail).then((res) => {
            this.setState({details: res});
            document.getElementById("profile-image").src = res.profilePicUrl;
        }).catch((err) => {this.setState({details: 'none'});});
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }
        if (this.state.details === 'none') {
            return <Redirect to='/no-account-found' />
        }
        if (!this.state.details) {
            return null;
        }
        return (
            <div className={"section text-align-center"}>
                <div className={"profile-container"}>
                    {this.props.match.params.authEmail === this.state.details.email &&
                        <button className={"profile-edit-button"} onClick={this.goToEditProfilePage}>Edit Profile</button>
                    }
                    <h1 className={"profile-heading"}>{this.state.details.name}'s Profile</h1>
                    <div className={"profile-image-container"} onClick={this.goToEditProfilePage}>
                        <img className={"profile-image"} id="profile-image" src={require("../assets/default-profile-pic.jpg")} alt=""/>
                    </div>
                    <div className={"profile-fields-container"}>
                        <div>Name: {this.state.details.name}</div>
                        <div>Email: {this.state.details.email}</div>
                        <div>Birthday: {this.state.details.birthday}</div>
                        <div>Gender: {this.state.details.gender}</div>
                        <div>Home Country: {this.state.details.homeCountry}</div>
                        <div>Current Country: {this.state.details.currentCountry}</div>
                        <div>Instagram: {this.state.details.instagramHandle}</div>
                        <div>Twitter: {this.state.details.twitterHandle}</div>
                        <div>YouTube: {this.state.details.youtubeUrl}</div>
                        <div>Website: {this.state.details.websiteUrl}</div>
                        <div>Available: {this.state.details.available}</div>
                        <div>Bio: {this.state.details.bio}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);