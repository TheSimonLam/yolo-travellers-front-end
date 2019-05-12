import React, { Component } from "react";
import { connect } from "react-redux";
import "../css/TravellerTab.css";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({

});

class Travellers extends Component {
    componentDidMount() {

    }
    render() {
        let travellerImageSrc = this.props.traveller.profilePicUrl
        return (
            <div className={"traveller-tab-container"}>
                <div className={"traveller-image-container"}>
                    <img className={"traveller-image"} id="traveller-image" src={travellerImageSrc} alt=""/>
                </div>
                <span className={"traveller-heading"}>Name: {this.props.traveller.name}</span>
                <span className={"traveller-heading"}>Gender: {this.props.traveller.gender}</span>
                <span className={"traveller-heading"}>Current Location: {this.props.traveller.currentCountry}</span>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Travellers);