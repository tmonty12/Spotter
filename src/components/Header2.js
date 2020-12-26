import React from "react";
import { withRouter, Link } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import firebase from "../firebase";
import { getProfileData } from "../actions/profile";
import { getPicURL } from "../actions/auth";
import ProfilePic from "./profile/ProfilePic";
import "./Header2.css";

class Header extends React.Component {
  onSignOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.history.push('/login')
    })
  };

  onSearch = ({ search }) => {
    if (search) {
      this.props.history.push(`/profile/search?query=${search}`);
      this.props.reset();
    }
  };

  renderInput = (formProps) => {
    return (
      <input
        type="search"
        {...formProps.input}
        placeholder={formProps.placeholder}
        className="form-control"
      />
    );
  };

  render() {
    if (this.props.isSignedIn === false) {
      return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
          <Link className="navbar-brand" to="/">
            <img src={require("../imgs/spotterWebsiteLogo.png")} alt="spotter logo"></img>
          </Link>
          <button
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Log In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      );
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-primary">
        <Link className="navbar-brand" to="/">
          <img src={require("../imgs/spotterWebsiteLogo.png")} alt="spotter logo"></img>
        </Link>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMenu">
          <ul className="navbar-nav ml-auto">
          <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link dropdown-toggle"
                to=""
                data-toggle="dropdown"
              >
                Blueprint
              </Link>
              <div className="dropdown-menu" id="blueprint-menu">
                <Link className="dropdown-item" to="/blueprint/logger">
                  Logger
                </Link>
                <Link className="dropdown-item" to="/blueprint/planner">
                  Planner
                </Link>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/exercises">
                Exercises
              </Link>
            </li>
            <form className="form-inline nav-link" onSubmit={this.props.handleSubmit(this.onSearch)}>
                <div className="input-group input-group-sm">
                  <Field
                    component={this.renderInput}
                    placeholder="Search user..."
                    name="search"
                  />
                    <div className="input-group-append">
                      <button className="input-group-text" type="submit"><i className="fas fa-search"></i></button>
                    </div>
                </div>
            </form>
            <li className="nav-item">
              <Link
                className="nav-link dropdown-toggle"
                to=""
                data-toggle="dropdown"
              >
                <ProfilePic
                  url={this.props.userPicURL}
                  classes="header-user-icon"
                />
              </Link>
              <div className="dropdown-menu dropdown-menu-right">
                <Link
                  className="dropdown-item"
                  to={`/profile/${this.props.userId}`}
                >
                  View Profile
                </Link>
                <Link
                  className="dropdown-item"
                  to={`/profile/${this.props.userId}/edit`}
                >
                  Edit Profile
                </Link>
                <Link className="dropdown-item" onClick={this.onSignOut} to="">
                  Sign Out
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </nav>
    );
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

const formWrapper = reduxForm({
  form: "profileSearch"
})(Header)

export default connect(mapStateToProps, { getProfileData, getPicURL })(
  withRouter(formWrapper)
);
