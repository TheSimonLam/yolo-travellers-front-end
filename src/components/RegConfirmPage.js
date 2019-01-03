import React, { Component } from "react";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({

})

class RegConfirmPage extends Component {
    render() {
        return (
            <div>Gee whizz, thanks for registering! Check your email for the confirmation link :)</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegConfirmPage);