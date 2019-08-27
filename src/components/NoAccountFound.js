import React, { Component } from "react";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({

})

class NoAccountFoundPage extends Component {
    render() {
        return (
            <div className={"section"}>No account found!</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoAccountFoundPage);