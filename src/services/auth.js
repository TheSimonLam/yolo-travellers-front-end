import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';

export default class Auth {

    static instance;

    constructor(){
        if(Auth.instance){return Auth.instance;}

        this.userToken = '';
        this.authName = '';
        this.authEmail = '';
        this.poolData = {
            UserPoolId : "us-east-1_dsOmZY9yx",
            ClientId : "4k6lski8sbea8r34hslq35h29d"
        };
        this.userPool = new CognitoUserPool(this.poolData);
        this.cognitoUser = null;

        this.lambdaUrl = process.env.REACT_APP_LAMBDA_URL;

        Auth.instance = this;
    }

    getCurrentSession = () => {
        return new Promise((resolve, reject) => {
            this.cognitoUser = this.userPool.getCurrentUser();
            if(this.cognitoUser !== null){
                this.cognitoUser.getSession(function(err, session) {
                    if (err) {reject(err);}
                    this.userToken = session.getIdToken().getJwtToken();
                    this.authEmail = this.cognitoUser.username;
                    resolve({userToken: this.userToken, loggedIn: true});
                }.bind(this));
            }
        });
    };

    logoutUser(){
        if (this.cognitoUser != null) {this.cognitoUser.signOut();}
    }

    registerUser = (authEmail, authName, pw) => {
        return new Promise((resolve) =>{
            let attributeList = [];
            let dataEmail = {Name: 'email', Value: authEmail};
            let dataName = {Name: 'name',Value: authName};

            let attributeEmail = new CognitoUserAttribute(dataEmail);
            let attributeName = new CognitoUserAttribute(dataName);

            attributeList.push(attributeEmail);
            attributeList.push(attributeName);

            this.userPool.signUp(authEmail, pw, attributeList, null, function(err, result){
                if(err){resolve({registered: false, message: err.message}); return;}
                this.cognitoUser = result.user;
                resolve({registered: true});
            }.bind(this));
        });
    };

    loginUser = (email, pw) => {
        return new Promise((resolve, reject) => {
            let authenticationData = {Username: email, Password: pw};
            let authenticationDetails = new AuthenticationDetails(authenticationData);
            let userData = {Username: email, Pool: this.userPool};

            this.cognitoUser = new CognitoUser(userData);

            this.cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function(res){
                    this.userToken = res.getIdToken().getJwtToken();

                    this.cognitoUser.getUserAttributes(function(err, result) {
                        if (err) {resolve({loggedIn: false, message: err.message}); return;}
                            this.authName = result[2].Value;
                            this.authEmail = result[3].Value;
                            resolve({ userToken: this.userToken, loggedIn: true});
                    }.bind(this));
                }.bind(this),
                onFailure: function(err){
                    reject(err);
                }
            })
        });
    };
}