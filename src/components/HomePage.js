import React, { Component } from "react";
import {connect} from "react-redux";

const mapStateToProps = state => ({
    ...state
})

const mapDispatchToProps = dispatch => ({

})

class Home extends Component {
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