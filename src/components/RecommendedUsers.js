import React from "react";
import { connect } from "react-redux";
import { getProfiles } from "../actions/social";
import firebase from "../firebase";
import ProfileCard from "./profile/ProfileCard";

class RecommendedUsers extends React.Component {
  componentDidMount() {
    const profiles = [];
    firebase
      .firestore()
      .collection("profiles")
      .get()
      .then((response) => {
        response.docs.forEach((profile) => {
          if (profile.data().userId !== this.props.userId) {
            profiles.push(profile.data().userId);
          }
        });
      })
      .then(() => this.props.getProfiles(profiles));
  }

  renderProfiles() {
    return this.props.profiles
      .filter((profile) => profile.userId !== this.props.userId)
      .map((profile) => <ProfileCard profile={profile} key={profile.userId} />);
  }

  render() {
    return (
      <div className="social-container">
        <h4 className="ui segment">Recommended Users</h4>
        <div className="profile-card-grid">{this.renderProfiles()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { getProfiles })(RecommendedUsers);
