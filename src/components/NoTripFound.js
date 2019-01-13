import React, { Component } from "react";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({
    resetNoTripFound(){
        console.log('reset no trip found');
        dispatch({
            type: 'SET_NO_TRIP_FOUND',
            payload: {noTripFound: false}
        })
    }
})

class NoTripFoundPage extends Component {
    componentDidMount(){
        this.props.resetNoTripFound();
    }
    render() {
        return (
            <div>No trip found!</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoTripFoundPage);