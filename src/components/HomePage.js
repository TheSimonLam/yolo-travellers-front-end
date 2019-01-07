import React, { Component } from "react";
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
            <pre>
             {
                 // JSON.stringify(this.props.authReducer)
             }
            </pre>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);