import React from "react";
import { Link } from "react-router-dom";
import ProfilePic from "./ProfilePic";

class ProfileCard extends React.Component {
  render() {
    return (
      <div className="card profile-search-card">
        <div className="card-body d-flex justify-content-center">
          <ProfilePic
            url={this.props.profile.profilePicURL}
            classes="profile-card-icon"
          />
        </div>
        <div className="card-body">
          <Link to={`/profile/${this.props.profile.userId}`} classes="card-link">
            {this.props.profile.username}
          </Link>
        </div>
      </div>
    );
  }
}

export default ProfileCard;
