import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
// import sigV4Client from '../plugins/sigV4Client';
// let AWS = require('aws-sdk');

export default class Account {

    static instance;

    constructor(){
        if(Account.instance){
            return Account.instance;
        }

        this.userToken = '';
        this.region = "us-east-1";
        this.poolData = {
            UserPoolId : "us-east-1_YEqkmnPfa",
            ClientId : "5tued675ds6nk4nc7ng7mq71bq"
        };
        this.userPool = new CognitoUserPool(this.poolData);
        this.cognitoUser = null;
        this.lambdaUrl = 'https://oy3ujiyqf4.execute-api.us-east-1.amazonaws.com/dev/';

        this.birthday = '';
        this.gender = '';
        this.homeCountry = '';
        this.currentCountry = '';
        this.instagramHandle = '';
        this.twitterHandle = '';
        this.youtubeUrl = '';
        this.websiteUrl = '';
        this.available = '';
        this.bio = '';

        Account.instance = this;
    }

    getCurrentSession = () => {
        return new Promise((resolve, reject) => {
            this.cognitoUser = this.userPool.getCurrentUser();
            if(this.cognitoUser !== null){
                this.cognitoUser.getSession(function(err, session) {
                    if (err) {
                        reject(err);
                    }

                    this.userToken = this.cognitoUser.signInUserSession.idToken.jwtToken;
                    resolve({
                        userToken: this.userToken,
                        loggedIn: true
                    });
                }.bind(this));
            }
        });

    };

    logoutUser(){
        if (this.cognitoUser != null) {
            this.cognitoUser.signOut();
        }
    }

    registerUser = (email, name, pw) => {
        return new Promise((resolve, reject) =>{
            let attributeList = [];
            let dataEmail = {
                Name: 'email',
                Value: email
            };
            let dataName = {
                Name: 'name',
                Value: name
            };

            let attributeEmail = new CognitoUserAttribute(dataEmail);
            let attributeName = new CognitoUserAttribute(dataName);

            attributeList.push(attributeEmail);
            attributeList.push(attributeName);

            this.userPool.signUp(email, pw, attributeList, null, function(err, result){
                if(err){resolve({registered: false, message: err.message}); return;}
                this.cognitoUser = result.user;
                resolve({registered: true});
            }.bind(this));
        });
    };

    loginUser = (email, pw) => {
        return new Promise((resolve, reject) => {
            let authenticationData = {
                Username: email,
                Password: pw
            };
            let authenticationDetails = new AuthenticationDetails(authenticationData);

            let userData = {
                Username: email,
                Pool: this.userPool
            };
            this.cognitoUser = new CognitoUser(userData);

            this.cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function(res){
                    this.userToken = res.getIdToken().getJwtToken();

                    this.cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {resolve({loggedIn: false, message: err.message}); return;}
                        // this.createUserIfNotExists(this.userToken ,result[2].Value, result[3].Value);

                        resolve({
                            userToken: this.userToken,
                            loggedIn: true
                        });
                    }.bind(this));
                }.bind(this),
                onFailure: function(err){
                    reject(err);
                }
            })
        });
    };

    createUserIfNotExists = async (userToken, name, email) => {
        const rawResponse = await fetch(this.lambdaUrl + 'users', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken
            },
            body: JSON.stringify({email: email, name: name})
        });
        const content = await rawResponse.json();
        console.log(content);

    };

    setUserDetails = (details) => {

    }
}