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

});

class Travellers extends Component {
    constructor(){
        super();
        this.state = {
            travellers: []
        };
    }
    componentDidMount() {
        traveller.getTravellers(auth.userToken).then((res)=>{
            this.setState({travellers: res});
        });
    }
    render() {
        if (!this.props.authReducer.loggedIn) {
            return <div>You are not logged in!</div>
        }

        let travellerTabs = this.state.travellers.map((traveller, index) => (
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