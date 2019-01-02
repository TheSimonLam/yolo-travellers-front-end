import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
require("aws-sdk");

export default class Account {

    static instance;

    constructor(){
        if(Account.instance){
            return Account.instance;
        }

        this.accessToken = '';
        this.userAttributes = {};
        this.region = "us-east-1";
        this.poolData = {
            UserPoolId : "us-east-1_cyEVs5eYF",
            ClientId : "178mjps0n1lr7o67fhfo56ktun"
        };
        this.userPool = new CognitoUserPool(this.poolData);
        this.cognitoUser = null;

        Account.instance = this;
    }

    getCurrentSession = () => {
        return new Promise((resolve, reject) => {
            this.cognitoUser = this.userPool.getCurrentUser();
            console.log(this.cognitoUser);
            if(this.cognitoUser !== null){
                this.cognitoUser.getSession(function(err, session) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    console.log('session validity: ' + session.isValid());
                    this.cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {
                            console.log(err);
                            reject(err);
                        }
                        this.userAttributes = result;
                        this.accessToken = this.cognitoUser.signInUserSession.accessToken.jwtToken;
                        resolve({
                            userAttributes: this.userAttributes,
                            accessToken: this.accessToken
                        });
                    }.bind(this));
                }.bind(this));
            }
        });

    };

    logoutUser(){
        console.log(this.cognitoUser);
        if (this.cognitoUser != null) {
            this.cognitoUser.signOut();
        }
    }

    registerUser = (email, name, pw) => {

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
            if(err){console.log(err); return;}
            this.cognitoUser = result.user;
        }.bind(this));
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
                    this.accessToken = res.getAccessToken().getJwtToken();
                    console.log(res);

                    this.cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        this.userAttributes = result;
                        resolve({
                            userAttributes: this.userAttributes,
                            accessToken: this.accessToken
                        });
                    }.bind(this));
                }.bind(this),
                onFailure: function(err){
                    console.log(err);
                    reject(err);
                }
            })
        });

    };

    // getUserAttributes = () => {
    //     return this.userAttributes;
    // };
    //
    // getAccessToken = () => {
    //     return this.accessToken;
    // };
}