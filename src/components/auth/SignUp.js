import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import firebase from "../../firebase";
import {
  createErrorMessage,
  clearErrorMessages,
  getUserDisplayName,
} from "../../actions/auth";
import ErrorMessage from "../ErrorMessage";
import FormField from "../FormField";
import "./AuthForm.css";

class SignUp extends React.Component {
  componentWillUnmount() {
    this.props.clearErrorMessages();
    if (firebase.auth().currentUser) {
      const email = firebase.auth().currentUser.email;
      const username = email.split("@")[0];
      const userId = firebase.auth().currentUser.uid;
      firebase
        .firestore()
        .collection("profiles")
        .doc(`${userId}`)
        .set({ username, userId, profilePicURL: false })
        .then(() => {
          this.props.setUserDisplayName(username);
          this.props.getUserDisplayName(username);
          this.subscribeToMyAccount(userId)
        });
    }
  }

  subscribeToMyAccount(userId) {
    const followingRef = firebase
      .firestore()
      .collection("profiles")
      .doc(userId)
      .collection("social")
      .doc('wrfWCz04OHOw8e0lZTEopQ7w1lj1');
    followingRef.get().then((doc) => {
      if (doc.exists) {
        followingRef.update({ isFollowing: "accepted" });
      } else {
        followingRef.set({ isFollowing: "accepted", userId: 'wrfWCz04OHOw8e0lZTEopQ7w1lj1' });
      }
    });
    const date = new Date();
    const followerRef = firebase
      .firestore()
      .collection("profiles")
      .doc('wrfWCz04OHOw8e0lZTEopQ7w1lj1')
      .collection("social")
      .doc(userId);
    followerRef.get().then((doc) => {
      if (doc.exists) {
        followerRef.update({ isFollower: 'accepted', timestamp: date.getTime() });
      } else {
        followerRef.set({
          isFollower: 'accepted',
          userId: userId,
          timestamp: date.getTime(),
        });
      }
    });
  }

  renderSignUpError() {
    if (this.props.errorMessage !== null) {
      return (
        <div className="form-group">
          <input
            className="form-control is-invalid"
            style={{ display: "none" }}
          />
          <ErrorMessage text={this.props.errorMessage} />
        </div>
      );
    }
  }

  renderFields() {
    const fields = [
      { name: "email", inputType: "input", label: "Email", type: "email" },
      {
        name: "password",
        inputType: "input",
        label: "Password",
        type: "password",
      },
      {
        name: "checkPassword",
        inputType: "input",
        label: "Confirm Password",
        type: "password",
      },
    ];
    return fields.map((field) => <FormField {...field} key={field.name} />);
  }

  onSignUp = ({ email, password }) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => this.props.createErrorMessage("signUp", error.message));
  };

  render() {
    return (
      <div className="card auth-card">
        <div className="card-body">
          <h5 className="card-title auth-title">Sign Up</h5>
          <form
            className="ui form error"
            onSubmit={this.props.handleSubmit(this.onSignUp)}
          >
            {this.renderFields()}
            {this.renderSignUpError()}
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "You must enter an email";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  if (!formValues.checkPassword) {
    errors.checkPassword = "You must confirm your password";
  } else if (formValues.password !== formValues.checkPassword) {
    errors.checkPassword = "Your passwords do not match";
  }
  return errors;
};

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.signUpErrorMessage };
};

const formWrapper = reduxForm({
  form: "signUp",
  validate,
})(SignUp);

export default connect(mapStateToProps, {
  createErrorMessage,
  clearErrorMessages,
  getUserDisplayName,
})(formWrapper);
