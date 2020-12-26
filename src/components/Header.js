import React from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../firebase";
import { getProfileData } from "../actions/profile";
import { getPicURL } from "../actions/auth";
import ProfilePic from "./profile/ProfilePic";
import "./Header.css";

class Header extends React.Component {
  onSignOut = () => {
    firebase.auth().signOut();
  };

  render() {
    const { push } = this.props.history;
    if (this.props.windowWidth > 768) {
      if (this.props.isSignedIn === false) {
        return (
          <header>
            <h1 className="header-title" onClick={() => push("/")}>
              <img src="../../public/spotterLogo.png" alt="logo"></img>
            </h1>
            <ul className="auth-link-container">
              <li className="header-list-item">
                <div className="header-link" onClick={() => push("/login")}>
                  Log In
                </div>
              </li>
              <li className="header-list-item">
                <div className="header-link" onClick={() => push("/signup")}>
                  Sign Up
                </div>
              </li>
            </ul>
          </header>
        );
      }
      return (
        <header>
          <h1 className="header-title" onClick={() => push("/")}>
            LiftBuddy
          </h1>
          <ul className="link-container">
            <li className="header-list-item">
              <div className="dropdown-menu">
                <div className="dropdown-header header-title">Blueprint</div>
                <div className="dropdown-content">
                  <Link to="/blueprint/logger">Logger</Link>
                  <Link to="/blueprint/planner">Planner</Link>
                </div>
              </div>
            </li>
            <li className="header-list-item">
              <div className="header-link" onClick={() => push("/exercises")}>
                Exercises
              </div>
            </li>
            <li className="header-list-item">
              <div className="header-link" onClick={() => push("/messaging")}>
                Messaging
              </div>
            </li>
            <li id="search-icon-container" className="header-list-item">
              <i
                className="ui search icon"
                onClick={() => this.props.history.push("/profile/search")}
              ></i>
            </li>
            <li className="header-list-item">
              <div className="dropdown-menu">
                <ProfilePic
                  size="huge"
                  url={this.props.userPicURL}
                  classes="header-user-icon"
                />
                <div className="dropdown-content">
                  <div onClick={() => push(`/profile/${this.props.userId}`)}>
                    View Profile
                  </div>
                  <div
                    onClick={() => push(`/profile/${this.props.userId}/edit`)}
                  >
                    Edit Profile
                  </div>
                  <div onClick={this.onSignOut}>Sign Out</div>
                </div>
              </div>
            </li>
          </ul>
        </header>
      );
    } else {
      if (this.props.isSignedIn === false) {
        return (
          <header>
            <h1 className="header-title" onClick={() => push("/")}>
              LiftBuddy
            </h1>
            <ul className="link-container">
              <li className="header-list-item">
                <div className="dropdown-menu">
                  <i className="bars icon dropdown-header" id="menu-icon"></i>
                  <div className="not-signed-in dropdown-content">
                    <Link to="/login">Log In</Link>
                    <Link to="/signup">Sign Up</Link>
                  </div>
                </div>
              </li>
            </ul>
          </header>
        );
      }
      return (
        <header>
          <h1 className="header-title" onClick={() => push("/")}>
            LiftBuddy
          </h1>
          <ul className="link-container">
            <li className="header-list-item">
              <div className="header-dropdown-menu dropdown-menu">
                <i className="bars icon dropdown-header" id="menu-icon"></i>
                <div className="dropdown-content">
                  <div className="dropdown-submenu">
                    <div className="dropdown-header">
                      Blueprint
                      <i className="sort down icon"></i>
                    </div>
                    <div className="dropdown-subcontent">
                      <Link to="/blueprint/logger">Logger</Link>
                      <Link to="/blueprint/planner">Planner</Link>
                    </div>
                  </div>
                  <Link to="/exercises">Exercises</Link>
                  <Link to="/messaging">Messaging</Link>
                  <Link to="/profile/search">Search</Link>
                </div>
              </div>
            </li>
            <li className="header-list-item">
              <div className="header-dropdown-menu dropdown-menu">
                <ProfilePic
                  size="huge"
                  url={this.props.userPicURL}
                  classes="header-user-icon"
                />
                <div className="dropdown-content">
                  <div onClick={() => push(`/profile/${this.props.userId}`)}>
                    View Profile
                  </div>
                  <div
                    onClick={() => push(`/profile/${this.props.userId}/edit`)}
                  >
                    Edit Profile
                  </div>
                  <div onClick={this.onSignOut}>Sign Out</div>
                </div>
              </div>
            </li>
          </ul>
        </header>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    userId: state.auth.userId,
    userPicURL: state.auth.userPicURL,
    windowWidth: state.window,
  };
};

export default connect(mapStateToProps, { getProfileData, getPicURL })(
  withRouter(Header)
);
