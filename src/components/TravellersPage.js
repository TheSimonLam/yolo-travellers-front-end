import React, { Component } from "react";
import { connect } from "react-redux";
import Auth from "../services/auth";
import Traveller from "../services/traveller";
import TravellerTab from "./TravellerTab";
import "../css/TravellersPage.css";

const auth = new Auth();
const traveller = new Traveller();

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    getCurrentSession() {
        return auth.getCurrentSession().then(
            res => dispatch({
                type: 'SET_CURRENT_SESSION',
                payload: res
            })
        )
    },
    setTravellers() {
        return traveller.getTravellers(auth.userToken).then(
            res => dispatch({
                type: 'SET_TRAVELLERS',
                payload: res
            })
        )
    }
});

class Travellers extends Component {
    componentDidMount() {
        this.props.travellersReducer.travellers = [];
        this.props.getCurrentSession().then(() => {
            this.props.setTravellers(auth.userToken);
        });
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }

        let travellerTabs = this.props.travellersReducer.travellers.map((traveller, index) => (
            <TravellerTab key={index} traveller={traveller}></TravellerTab>
        ));

        return (
            <div className={"section"}>
                <div className={"travellers-container"}>
                    {travellerTabs}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Travellers);