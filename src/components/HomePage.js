import React, { Component } from "react";
import '../css/HomePage.css';
import {connect} from "react-redux";
import Auth from "../services/auth";

const auth = new Auth();

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    getCurrentSession(){
        return auth.getCurrentSession().then(
            res => dispatch({
                type: 'SET_CURRENT_SESSION',
                payload: res
            })
        )
    }
})

class Home extends Component {
    componentDidMount(){
        this.props.getCurrentSession().then(() => {
            //TODO: Do stuff after getting session
        });
    }
    render() {
        return (
            <div>
                <div className={"hero-container"}>
                    <h1 className={"hero-heading"}>Explore the world together!</h1>
                </div>

                <div className={"summary-container"}>

                    <div className={"row"}>
                        <div className={"column"}>
                            <div className={"column-content"}>
                                <img className={"summary-image"} src={require("../assets/polaroids.jpg")}/>
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