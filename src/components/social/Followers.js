import React from "react";
import { connect } from "react-redux";
import { getSocialData, getProfiles, clearSocialData } from "../../actions/social";
import ProfileCard from "../profile/ProfileCard";
import BigSpinner from '../BigSpinner';
import "./Social.css";

class Followers extends React.Component {
  componentDidMount = async () => {
    const userId = this.props.history.location.pathname.split("/")[2];
    await this.props.getSocialData("isFollower", userId);
    this.props.getProfiles(this.props.followers);
  };

  componentWillUnmount(){
    this.props.clearSocialData()
  }

  renderProfiles = () => {
    if(!this.props.followers){
      return <BigSpinner />
    } else {
      if (this.props.followers.length === 0) {
        return (
          <div className="social-title-card" style={{backgroundColor: 'revert'}}>
            <i className="fas fa-user-plus" style={{fontSize:'100px', marginBottom:'20px'}}></i>
            <h4 className="request-title">You have no lift buddies</h4>
          </div>
        );
      } else {
        let profiles = [];
        if (this.props.profiles && this.props.followers) {
          this.props.profiles.forEach((profile) => {
            this.props.followers.forEach((followerId) => {
              if (profile.userId === followerId) {
                profiles.push(profile);
              }
            });
          });
        }
        profiles = profiles.map((profile) => (
          <ProfileCard profile={profile} key={profile.userId} />
        ));
        return <div className="profile-card-grid social">{profiles}</div>;
      }
    }
  };

  render() {
    return (
      <div>
        <div className="card social-title-card">
          <div className="card-body">
            <h4>Followers</h4>
          </div>  
        </div>
        {this.renderProfiles()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
    followers: state.social.followers,
  };
};

export default connect(mapStateToProps, {
  getSocialData,
  getProfiles,
  clearSocialData
})(Followers);
