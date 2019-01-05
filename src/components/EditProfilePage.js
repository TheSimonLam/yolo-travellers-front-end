import React, { Component } from "react";
import Account from "../services/account";
import Auth from "../services/auth";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const account = new Account();
const auth = new Auth();

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    setRetrievedAccountDetails(res){
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
});

class EditProfile extends Component {
    componentDidMount(){
        account.retrieveAccountDetailsByAuthEmail(auth.userToken, this.props.match.params.authEmail).then((res) => {
            this.props.setRetrievedAccountDetails(res);
        });

        this.onDetailsInput = (evt) => {
            this.props.accountReducer[evt.target.name] = evt.target.value;
        };

        this.validateDetails = () => {
            let validation = {valid: true, errors: ''};
            //TODO: validate this.props.accountReducer variables
            return validation;
        };

        this.saveProfileData = () => {
            const validCheck = this.validateDetails(this.props.accountReducer);
            if(validCheck.valid){
                account.setUserProfileDetails(auth.userToken, this.props.match.params.authEmail, this.props.accountReducer).then((res) => {
                    this.props.history.push('/profile/' + this.props.match.params.authEmail);
                }).catch((err) => {
                    console.log(err);
                })
            }
            else{
                console.log('false');
                console.log(validCheck.errors);
            }
        }
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <h1>Edit Profile</h1>
                <div>Name: <input name="name" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.name}/></div>
                {/*TODO: Email and password have to be changed in Cognito!*/}
                <div>Password: <input name="password" defaultValue={"*****"}/></div>
                <div>Email: <input name="email" defaultValue={this.props.accountReducer.email}/></div>
                <div>Birthday: <input name="birthday" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.birthday}/></div>
                <div>Gender: <input name="gender" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.gender}/></div>
                <div>Home Country: <input name="homeCountry" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.homeCountry}/></div>
                <div>Current Country: <input name="currentCountry" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.currentCountry}/></div>
                <div>Instagram: <input name="instagramHandle" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.instagramHandle}/></div>
                <div>Twitter: <input name="twitterHandle" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.twitterHandle}/></div>
                <div>YouTube: <input name="youtubeUrl" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.youtubeUrl}/></div>
                <div>Website: <input name="websiteUrl" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.websiteUrl}/></div>
                <div>Available: <input name="available" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.available}/></div>
                <div>Bio: <input name="bio" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.bio}/></div>
                <button onClick={this.saveProfileData}>Save</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);