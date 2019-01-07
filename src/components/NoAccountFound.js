import React, { Component } from "react";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    resetNoAccFound(){
        dispatch({
            type: 'SET_NO_ACCOUNT_FOUND',
            payload: {noAccFound: false}
        })
    }
})

class NoAccountFoundPage extends Component {
    componentDidMount(){
        this.props.resetNoAccFound();
    }
    render() {
        return (
            <div>No account found!</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoAccountFoundPage);