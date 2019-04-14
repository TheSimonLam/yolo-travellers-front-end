import React, { Component } from "react";
import {connect} from "react-redux";
import Auth from "../services/auth";
import Traveller from "../services/traveller";

const auth = new Auth();
const traveller = new Traveller();

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getCurrentSession(){
        return auth.getCurrentSession().then(
            res => dispatch({
                type: 'SET_CURRENT_SESSION',
                payload: res
            })
        )
    },
    setTravellers(){
        return traveller.getTravellers(auth.userToken).then(
            res => dispatch({
                type: 'SET_TRAVELLERS',
                payload: res
            })
        )
    }
});

class Travellers extends Component {
    componentDidMount(){
        this.props.getCurrentSession().then(() => {
            this.props.setTravellers(auth.userToken);
        });
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }
        return (
            <div className={"section"}>{JSON.stringify(this.props.travellersReducer.travellers)}</div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Travellers);