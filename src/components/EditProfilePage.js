import React, { Component } from "react";
import Account from "../services/account";
import Auth from "../services/auth";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import '../css/EditProfilePage.css';

const account = new Account();
const auth = new Auth();

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getCurrentSession(){
        return auth.getCurrentSession().then(
            res => dispatch({
                type: 'SET_CURRENT_SESSION',
                payload: res
            })
        )
    },
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
});

class EditProfile extends Component {
    componentDidMount(){
        this.props.getCurrentSession().then(() => {
            account.retrieveAccountDetailsByAuthEmail(auth.userToken, this.props.match.params.authEmail).then((res) => {
                this.props.setRetrievedAccountDetails(res);
            }).catch((err) => {console.log(err);});
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

        this.saveProfileImage = (e) => {
            const validCheck = this.validateDetails(this.props.accountReducer);
            if(validCheck.valid){
                const file = e.target.files[0],
                    reader = new FileReader();

                reader.onloadend = () => {
                    console.log(reader.result);
                    account.setUserProfileImage(auth.userToken, this.props.match.params.authEmail, reader.result).then((res) => {
                        console.log(res);
                    }).catch((err) => {
                        console.log(err);
                    })
                }

                reader.readAsDataURL(file);
            }
            else{
                console.log('false');
                console.log(validCheck.errors);
            }
        }
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
                <h1>Edit Profile</h1>
                <div className={"profile-image-container"} onClick={this.goToEditProfilePage}>
                    <img className={"profile-image"} alt="profile-pic"/>
                    <input type='file' id='single' onChange={this.saveProfileImage} />
                </div>
                <div>Name: <input className={"profile-info-input"} name="name" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.name}/></div>
                {/*TODO: Email and password have to be changed in Cognito!*/}
                <div>Password: <input className={"profile-info-input"} name="password" defaultValue={"*****"}/></div>
                <div>Email: <input className={"profile-info-input"} name="email" defaultValue={this.props.accountReducer.email}/></div>
                <div>Birthday: <input className={"profile-info-input"} name="birthday" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.birthday}/></div>
                <div>Gender: <input className={"profile-info-input"} name="gender" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.gender}/></div>
                <div>Home Country: <input className={"profile-info-input"} name="homeCountry" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.homeCountry}/></div>
                <div>Current Country: <input className={"profile-info-input"} name="currentCountry" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.currentCountry}/></div>
                <div>Instagram: <input className={"profile-info-input"} name="instagramHandle" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.instagramHandle}/></div>
                <div>Twitter: <input className={"profile-info-input"} name="twitterHandle" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.twitterHandle}/></div>
                <div>YouTube: <input className={"profile-info-input"} name="youtubeUrl" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.youtubeUrl}/></div>
                <div>Website: <input className={"profile-info-input"} name="websiteUrl" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.websiteUrl}/></div>
                <div>Available: <input className={"profile-info-input"} name="available" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.available}/></div>
                <div>Bio: <input className={"profile-info-input"} name="bio" onChange={this.onDetailsInput} defaultValue={this.props.accountReducer.bio}/></div>
                <button onClick={this.saveProfileData}>Save</button>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);