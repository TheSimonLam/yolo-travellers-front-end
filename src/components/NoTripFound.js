import React, { Component } from "react";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({

})

class NoTripFoundPage extends Component {
    render() {
        return (
            <div className={"section"}>No trip found!</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoTripFoundPage);