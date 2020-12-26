import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { resizeWindow } from "../actions/window";
import {
  setUserStatus,
  getPicURL,
  getUserDisplayName,
  setNoUserPicURL,
} from "../actions/auth";
import firebase from "../firebase";
import PrivateRoute from "./PrivateRoute";
import Header2 from "./Header2";
import About from "./About";
import LogIn from "./auth/LogIn";
import SignUp from "./auth/SignUp";
import Feed from "./Feed";
import Logger from "./Logger";
import Planner from "./Planner";
import Exercises from "./Exercises";
import Messaging from "./Messaging";
import ProfileSearch from "./profile/ProfileSearch";
import ProfilePage from './profile/ProfilePage';
import EditProfile from "./profile/EditProfile";
import CreatePost from "./post/CreatePost";
import Post from "./post/Post";
import EditPost from "./post/EditPost";
import DeletePost from "./post/DeletePost";
import Requests from "./Requests";
import Followers from "./social/Followers";
import Following from "./social/Following";
import RecommendedUsers from "./RecommendedUsers";
import CreateLog from "./CreateLog";
import ComingSoon from "./ComingSoon";

class App extends React.Component {
  componentDidMount = () => {
    window.addEventListener("resize", this.resizeWindow);
    firebase.auth().onAuthStateChanged((user) => {
      this.props.setUserStatus(user);
      if (user) {
        this.user = user;
        this.props.getUserDisplayName(user.displayName);
        if (user.photoURL === "true") {
          this.props.getPicURL("GET_USER_PIC_URL", user.uid);
        } else {
          this.props.setNoUserPicURL();
        }
      }
    });
  };

  resizeWindow = () => {
    this.props.resizeWindow(window.innerWidth);
  };

  setUserPicURL = () => {
    this.user.updateProfile({ photoURL: "true" });
  };

  setUserDisplayName = (displayName) => {
    this.user.updateProfile({ displayName });
  };

  render() {
    return (
      <BrowserRouter>
        <Header2 />
        <Switch id="page-content">
          <PrivateRoute
            path="/"
            accessType="onSignedIn"
            exact
            component={Feed}
          />
          <PrivateRoute
            path="/login"
            accessType="onSignedOut"
            exact
            component={LogIn}
          />
          <PrivateRoute
            path="/signup"
            accessType="onSignedOut"
            exact
            component={() => (
              <SignUp setUserDisplayName={this.setUserDisplayName} />
            )}
          />
          <PrivateRoute
            path="/about"
            accessType="onSignedIn"
            exact
            component={About}
          />
          <PrivateRoute
            path="/blueprint/logger"
            accessType="onSignedIn"
            exact
            component={ComingSoon}
          />
          <PrivateRoute
            path="/blueprint/planner"
            accessType="onSignedIn"
            exact
            component={ComingSoon}
          />
          <PrivateRoute
            path="/exercises"
            accessType="onSignedIn"
            exact
            component={ComingSoon}
          />
          <PrivateRoute
            path="/profile/search"
            accessType="onSignedIn"
            exact
            component={ProfileSearch}
          />
          <PrivateRoute
            path="/profile/recommended"
            accessType="onSignedIn"
            exact
            component={RecommendedUsers}
          />
          <PrivateRoute
            path="/profile/:userId"
            accessType="onSignedIn"
            exact
            component={ProfilePage}
          />
          <PrivateRoute
            path="/profile/:userId/edit"
            accessType="onSignedIn"
            exact
            component={() => (
              <EditProfile
                setUserPicURL={this.setUserPicURL}
                setUserDisplayName={this.setUserDisplayName}
              />
            )}
          />
          <PrivateRoute
            path="/posts/create"
            accessType="onSignedIn"
            exact
            component={CreatePost}
          />
          <PrivateRoute
            path="/posts/:postId"
            accessType="onSignedIn"
            exact
            component={Post}
          />
          <PrivateRoute
            path="/posts/:postId/edit"
            accessType="onSignedIn"
            exact
            component={EditPost}
          />
          <PrivateRoute
            path="/posts/:postId/delete"
            accessType="onSignedIn"
            exact
            component={DeletePost}
          />
          <PrivateRoute
            path="/profile/:userId/requests"
            accessType="onSignedIn"
            exact
            component={Requests}
          />
          <PrivateRoute
            path="/profile/:profileId/followers"
            accessType="onSignedIn"
            exact
            component={Followers}
          />
          <PrivateRoute
            path="/profile/:profileId/following"
            accessType="onSignedIn"
            exact
            component={Following}
          />
          <PrivateRoute
            path="/blueprint/logger/create"
            accessType="onSignedIn"
            exact
            component={CreateLog}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(null, {
  setUserStatus,
  getPicURL,
  getUserDisplayName,
  setNoUserPicURL,
  resizeWindow,
})(App);
