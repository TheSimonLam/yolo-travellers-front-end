import React, { Component } from "react";
import '../css/HomePage.css';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({

})

class Home extends Component {
    componentDidMount(){
        this.goToSignUpPage = this.goToSignUpPage.bind(this);
        this.goToTripsPage = this.goToTripsPage.bind(this);
    }
    goToSignUpPage = () => {
        this.props.history.push('/login-register');
    };
    goToTripsPage = () => {
        this.props.history.push('/all-trips');
    };
    render() {
        let heroButton;

        if (!this.props.authReducer.loggedIn) {
            heroButton = <button onClick={this.goToSignUpPage}>Sign up</button>
        }
        else{
            heroButton = <button onClick={this.goToTripsPage}>See Trips</button>
        }
        return (
            <div className={"section"}>
                <div className={"hero-container"}>
                    <div className={"hero-button-container"}>
                        <h1 className={"hero-heading"}>Explore the world together!</h1>
                        {heroButton}
                    </div>
                </div>

                <div className={"summary-container"}>

                    <div className={"row"}>
                        <div className={"column"}>
                            <div className={"column-content"}>
                                <img className={"summary-image"} src={require("../assets/polaroids.jpg")} alt={"img"}/>
                            </div>
                        </div>
                        <div className={"column"}>
                            <div className={"column-content"}>
                                <h2 className={"summary-heading"}>
                                    Get ready for a once in a lifetime experience
                                </h2>
                                <p className={"summary-text"}>
                                    Yes hello, this is the best website in the entire world. Dont believe me? Use it for yourself, you'll have such a great time, trust me - Simon Lam 2019
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);