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

});

class EditProfile extends Component {
    constructor (props) {
        super(props);
        this.state = {
            fileSizeError: false,
            details: undefined
        }
    }
    setFileSizeError (bool) {
        this.setState({
            fileSizeError: bool
        })
    }
    componentDidMount(){
        account.retrieveAccountDetailsByAuthEmail(auth.userToken, this.props.match.params.authEmail).then((res) => {
            this.setState({details: res});
            document.getElementById("profile-image").src = res.profilePicUrl;
        }).catch((err) => {this.setState({details: 'none'});});

        this.onDetailsInput = (evt) => {
            let details = this.state.details;
            details[evt.target.name] = evt.target.value;
            this.setState(details);
        };

        this.validateDetails = () => {
            let validation = {valid: true, errors: ''};
            return validation;
        };

        this.saveProfileData = () => {
            const validCheck = this.validateDetails(this.state.details);
            if(validCheck.valid){
                account.setUserProfileDetails(auth.userToken, this.props.match.params.authEmail, this.state.details).then((res) => {
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
            const validCheck = this.validateDetails(this.state.details);
            if(validCheck.valid){
                const file = e.target.files[0],
                    reader = new FileReader();

                this.setFileSizeError(false);

                if(file){
                    if(file.size <= 2000000){
                        reader.onloadend = () => {
                            account.uploadUserProfileImage(auth.userToken, this.props.match.params.authEmail, reader.result).then((res) => {
                                document.getElementById("profile-image").src = res.profilePicUrl + "?" + new Date().getTime(); //Get time so it refreshes <img> src
                            }).catch((err) => {
                                console.log(err);
                            })
                        }
                        reader.readAsDataURL(file);
                    }
                    else{
                        this.setFileSizeError(true);
                    }
                }
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
        if (this.state.details === "none") {
            return <Redirect to='/no-account-found' />
        }
        if (!this.state.details) {
            return null;
        }
        return (
            <div className={"section text-align-center"}>
                <div className={"edit-profile-container"}>
                    <h1 className={"edit-profile-heading"}>Edit Profile</h1>
                    <div className={"edit-profile-image-container"} onClick={this.goToEditProfilePage}>
                        <img className={"edit-profile-image"} id="profile-image" src={require("../assets/default-profile-pic.jpg")} alt=""/>
                    </div>
                    <div className={"profile-fields-container"}>
                        {this.state.fileSizeError && <div>File size must be less than 2mb!</div>}
                        <div className={"edit-profile-input-container"}>
                            <input type='file' accept="image/jpeg" onChange={this.saveProfileImage} />
                        </div>
                        <div>Name: <input className={"edit-profile-info-input"} name="name" onChange={this.onDetailsInput} defaultValue={this.state.details.name}/></div>
                        {/*TODO: Email and password have to be changed in Cognito!*/}
                        <div>Password: <input className={"edit-profile-info-input"} name="password" defaultValue={"*****"}/></div>
                        <div>Email: <input className={"edit-profile-info-input"} name="email" defaultValue={this.state.details.email}/></div>
                        <div>Birthday: <input className={"edit-profile-info-input"} name="birthday" onChange={this.onDetailsInput} defaultValue={this.state.details.birthday}/></div>
                        <div>Gender: <input className={"edit-profile-info-input"} name="gender" onChange={this.onDetailsInput} defaultValue={this.state.details.gender}/></div>
                        <div>Home Country: <input className={"edit-profile-info-input"} name="homeCountry" onChange={this.onDetailsInput} defaultValue={this.state.details.homeCountry}/></div>
                        <div>Current Country: <input className={"edit-profile-info-input"} name="currentCountry" onChange={this.onDetailsInput} defaultValue={this.state.details.currentCountry}/></div>
                        <div>Instagram: <input className={"edit-profile-info-input"} name="instagramHandle" onChange={this.onDetailsInput} defaultValue={this.state.details.instagramHandle}/></div>
                        <div>Twitter: <input className={"edit-profile-info-input"} name="twitterHandle" onChange={this.onDetailsInput} defaultValue={this.state.details.twitterHandle}/></div>
                        <div>YouTube: <input className={"edit-profile-info-input"} name="youtubeUrl" onChange={this.onDetailsInput} defaultValue={this.state.details.youtubeUrl}/></div>
                        <div>Website: <input className={"edit-profile-info-input"} name="websiteUrl" onChange={this.onDetailsInput} defaultValue={this.state.details.websiteUrl}/></div>
                        <div>Available: <input className={"edit-profile-info-input"} name="available" onChange={this.onDetailsInput} defaultValue={this.state.details.available}/></div>
                        <div>Bio: <input className={"edit-profile-info-input"} name="bio" onChange={this.onDetailsInput} defaultValue={this.state.details.bio}/></div>
                        <button onClick={this.saveProfileData}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);