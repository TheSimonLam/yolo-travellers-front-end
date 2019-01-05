import React, { Component } from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    resetRegisteredVariable(){
        dispatch({
            type: 'SET_REGISTERED_USER',
            payload: {registered: false, message: ''}
        });
    }
})

class RegConfirmPage extends Component {
    render() {
        if (this.props.accountReducer.confirmationRedirect === false) {
            return <Redirect to='/' />
        }
        return (
            <div>Gee whizz, thanks for registering! Check your email for the confirmation link :)</div>
        );
    }
    componentDidMount(){
        setTimeout(() => {this.props.resetRegisteredVariable();}, 3000);

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegConfirmPage);