import React from "react";
import { connect } from "react-redux";
import { getSocialData, getProfiles, clearSocialData } from "../../actions/social";
import BigSpinner from '../BigSpinner';
import ProfileCard from "../profile/ProfileCard";

class Followers extends React.Component {
  componentDidMount = async () => {
    const userId = this.props.history.location.pathname.split("/")[2];
    await this.props.getSocialData("isFollowing", userId);
    this.props.getProfiles(this.props.following);
  };

  componentWillUnmount(){
    this.props.clearSocialData()
  }

  renderProfiles = () => {
    if(!this.props.following){
      return <BigSpinner />
    } else {
      if (this.props.following.length === 0) {
        return (
          <div className="social-title-card" style={{backgroundColor: 'revert'}}>
            <i className="fas fa-user-plus" style={{fontSize:'100px', marginBottom:'20px'}}></i>
            <h4 className="request-title">Add lift buddies</h4>
          </div>
        );
      } else {
        let profiles = [];
        if (this.props.profiles && this.props.following) {
          this.props.profiles.forEach((profile) => {
            this.props.following.forEach((followId) => {
              if (profile.userId === followId) {
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
            <h4>Following</h4>
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
    following: state.social.following,
  };
};

export default connect(mapStateToProps, {
  getSocialData,
  getProfiles,
  clearSocialData
})(Followers);
