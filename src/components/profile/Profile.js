import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import ProfilePic from "./ProfilePic";
import "./Profile.css";

class Profile extends React.Component {
  renderRequestButton() {
    if (this.props.profile.userId === this.props.userId) {
      if(this.props.requests){
        let requestBadge;
        const numOfRequests = this.props.requests.length
        numOfRequests > 0 ? requestBadge = (<span className="badge badge-light">{numOfRequests}</span>) : requestBadge = null;
        return (
          <button className="btn btn-primary" onClick={() => this.props.history.push(`/profile/${this.props.userId}/requests`)}>
            Requests {requestBadge}
          </button>
      );
      }
    } else {
      let btnContent;
      if (!this.props.social.isFollowing) {
        btnContent = "Add Friend";
      } else if (this.props.social.isFollowing === "requested") {
        btnContent = "Requested";
      } else {
        btnContent = "Unfollow Friend";
      }
      return (
        <button className="btn btn-primary" onClick={this.props.onFriendBtnClick}>
          {btnContent}
        </button>
      );
    }
    
  }

  renderEditButton() {
    if (this.props.profile.userId === this.props.userId) {
      return (
        <Link to={`/profile/${this.props.userId}/edit`}>
          <i className="fas fa-edit"> </i>{" "}
        </Link>
      );
    } else {
      return null;
    }
  }

  renderSocialMediaLinks() {
    const { facebookUsername, instagramUsername, twitterUsername } = this.props.profile;
    if (!facebookUsername && !instagramUsername && !twitterUsername) {
      return null;
    } else {
      return (
        <div>
          {facebookUsername ? (
            <a href={`https://www.facebook.com/${facebookUsername}`} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook social-icon"></i>
            </a>
          ) : null}
          {twitterUsername ? (
            <a href={`https://twitter.com/${twitterUsername}`} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter social-icon"> </i>
            </a>
          ) : null}
          {instagramUsername ? (
            <a href={`https://www.instagram.com/${instagramUsername}`} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram social-icon"> </i>
            </a>
          ) : null}
        </div>
      );
    }
  }

  calculateTotal() {
    let { bench1rm, squat1rm, deadlift1rm } = this.props.profile;
    !bench1rm ? (bench1rm = 0) : (bench1rm = Number(bench1rm));
    !squat1rm ? (squat1rm = 0) : (squat1rm = Number(squat1rm));
    !deadlift1rm ? (deadlift1rm = 0) : (deadlift1rm = Number(deadlift1rm));
    return deadlift1rm + squat1rm + bench1rm;
  }

  renderSocialStats() {
    let columnSize;
    this.props.windowWidth > 768 ? (columnSize = "") : (columnSize = "col-4");
    if (
      this.props.social.isFollowing === "accepted" ||
      this.props.profile.userId === this.props.userId
    ) {
      return (
        <>
          <div className={`${columnSize} profile-stats`}>
            <Link to={`/profile/${this.props.profile.userId}/followers`}>
              {this.props.social.followers.length} followers
            </Link>
          </div>
          <div className={`${columnSize} profile-stats`}>
            <Link to={`/profile/${this.props.profile.userId}/following`}>
              {this.props.social.following.length} following
            </Link>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className={`${columnSize} profile-stats`}>
            {this.props.social.followers.length} followers
          </div>
          <div className={`${columnSize} profile-stats`}>
            {this.props.social.following.length} following
          </div>
        </>
      );
    }
  }

  renderPostStat = () => {
    const numOfPosts = this.props.posts.filter(
      (post) => post.userId === this.props.profile.userId
    ).length;
    let postStat;
    numOfPosts === 1
      ? (postStat = `${numOfPosts} Post`)
      : (postStat = `${numOfPosts} Posts`);
    return postStat;
  };

  renderActionClasses = () => {
    let column;
    this.props.windowWidth > 768 ? column = "col-6" : column = "col-12";
    return `${column} profile-element d-flex justify-content-between button-row`
  }

  render() {
    const {
      name,
      deadlift1rm,
      bench1rm,
      squat1rm,
      description,
      username,
    } = this.props.profile;
    if (this.props.windowWidth > 768) {
      return (
        <div className="card profile-card">
          <div className="container">
            <div className="row">
              <h4 className="col-6 profile-title">{name}</h4>
              <div className="col-6 d-flex justify-content-end stats-row">
                {this.renderSocialStats()}
                <div className="profile-stats dropdown total-dropdown">
                  <div className="dropdown-toggle" data-toggle="dropdown">
                    {this.calculateTotal()}lb total
                  </div>
                  <div className="dropdown-menu dropdown-menu-right">
                    <div className="dropdown-item total-item">
                      {`${bench1rm ? bench1rm : "0"}lb Bench`}
                    </div>
                    <div className="dropdown-item total-item">
                      {`${deadlift1rm ? deadlift1rm : "0"}lb Deadlift`}
                    </div>
                    <div className="dropdown-item total-item">
                      {`${squat1rm ? squat1rm : "0"}lb Squat`}
                    </div>
                  </div>
                </div>
                <div className="profile-stats">{this.renderPostStat()}</div>
                <div className="profile-element">{this.renderEditButton()}</div>
              </div>
              <div className="col-6 profile-img-container">
                <ProfilePic
                  url={this.props.profile.profilePicURL}
                  classes="profile-pic"
                />
              </div>
              <div className="col-6 profile-element" id="profile-description">
                {description ? description : "Write a description..."}
              </div>
              <div className="col-6 profile-element" id="profile-username">
                {username}
              </div>
              <div className={this.renderActionClasses()}>
                {this.renderRequestButton()}
                {this.renderSocialMediaLinks()}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card profile-card">
          <div className="container">
            <div className="row">
              <h4 className="col-12 profile-title">{name}</h4>
              {this.renderSocialStats()}
              <div className="col-4 profile-stats dropdown">
                <div className="dropdown-toggle total-dropdown" data-toggle="dropdown">
                  {this.calculateTotal()}lb total
                </div>
                <div className="dropdown-menu dropdown-menu-right">
                  <div className="dropdown-item total-item">
                    {`${bench1rm ? bench1rm : "0"}lb Bench`}
                  </div>
                  <div className="dropdown-item total-item">
                    {`${deadlift1rm ? deadlift1rm : "0"}lb Deadlift`}
                  </div>
                  <div className="dropdown-item total-item">
                    {`${squat1rm ? squat1rm : "0"}lb Squat`}
                  </div>
                </div>
              </div>
              <div className="col-6 profile-stats">{this.renderPostStat()}</div>
              <div className="col-6 profile-element">
                {this.renderEditButton()}
              </div>
              <div className="col-12 profile-img-container">
                <ProfilePic
                  url={this.props.profile.profilePicURL}
                  classes="profile-pic"
                />
              </div>
              <div className="col-12 profile-element username">{username}</div>
              <div className="col-12 profile-element">
                {description ? description : "Write a description..."}
              </div>
              <div className={this.renderActionClasses()}>
                {this.renderRequestButton()}
                {this.renderSocialMediaLinks()}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    userId: state.auth.userId,
    social: state.social,
    requests: state.requests,
    posts: state.posts,
    windowWidth: state.window,
  };
};

export default connect(mapStateToProps)(withRouter(Profile));
