import React from "react";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";
import { getProfileData, updateProfile } from "../../actions/profile";
import { createErrorMessage, clearErrorMessages } from "../../actions/auth";
import { getPicURL } from "../../actions/auth";
import FormField from "../FormField";
import ErrorMessage from "../ErrorMessage";
import firebase from "../../firebase";
import "../post/Form.css";

class EditProfile extends React.Component {
  componentDidMount() {
    const profileId = this.props.history.location.pathname.split("/")[2];
    this.props.getProfileData(profileId);
  }

  componentWillUnmount() {
    this.props.clearErrorMessages();
  }

  renderFields() {
    const fields = [
      {
        name: "name",
        inputType: "input",
        label: "Name",
        type: "text",
      },
      {
        name: "username",
        inputType: "input",
        label: "Username",
        type: "text",
      },
      {
        name: "profilePic",
        inputType: "file",
        label: "Profile Pic",
        accept: "image/*",
      },
      {
        name: "description",
        inputType: "textArea",
        label: "Description",
      },
      {
        name: "squat1rm",
        inputType: "input",
        label: "Squat 1RM (lbs)",
        type: "number",
      },
      {
        name: "bench1rm",
        inputType: "input",
        label: "Bench 1RM (lbs)",
        type: "number",
      },
      {
        name: "deadlift1rm",
        inputType: "input",
        label: "Deadlift 1RM (lbs)",
        type: "number",
      },
      {
        name: "instagramUsername",
        inputType: "input",
        label: "Instagram Username",
        type: "text",
      },
      {
        name: "facebookUsername",
        inputType: "input",
        label: "Facebook Username",
        type: "text",
      },
      {
        name: "twitterUsername",
        inputType: "input",
        label: "Twitter Username",
        type: "text",
      },
    ];
    return fields.map((field) => <FormField {...field} key={field.name} />);
  }

  onUpdateProfile = async (formValues) => {
    const usernames = [];
    await firebase
      .firestore()
      .collection("profiles")
      .where("username", "==", formValues.username)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => usernames.push(doc.data()));
      });
    if (
      usernames.length === 0 ||
      formValues.username === this.props.initialValues.username
    ) {
      this.props.updateProfile(formValues, this.props.userId);
      if (formValues.profilePic) {
        this.props.setUserPicURL();
      }
      if (this.props.userDisplayName !== formValues.username) {
        this.props.setUserDisplayName(formValues.username);
      }
      this.props.history.goBack();
    } else {
      this.props.createErrorMessage(
        "editProfile",
        "That username has already been taken"
      );
    }
  };

  renderErrorMessage() {
    if (this.props.errorMessage !== null) {
      return <ErrorMessage text={this.props.errorMessage} />;
    }
  }

  render() {
    if (!this.props.profileId || !this.props.userId) {
      return <div> Loading </div>;
    } else {
      if (this.props.userId !== this.props.profileId) {
        return <Redirect to={`/profile/${this.props.profileId}`} />;
      } else {
        return (
            <div className="card form-card">
              <div className="card-body">
                <h5 className="card-title">
                  Edit Profile
                </h5>
                {this.renderErrorMessage()}
                <form
                  className="ui form error"
                  onSubmit={this.props.handleSubmit(this.onUpdateProfile)}
                >
                  {this.renderFields()}
                  <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        this.props.history.push(`/profile/${this.props.userId}`)
                      }
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  const { profilePicURL, profileId, ...rest } = state.profile;
  return {
    initialValues: rest,
    userId: state.auth.userId,
    profileId: state.profile.userId,
    userDisplayName: state.auth.username,
    errorMessage: state.auth.editProfileErrorMessage,
  };
};

const formWrapper = reduxForm({
  form: "editProfile",
  enableReinitialize: true,
})(withRouter(EditProfile));

export default connect(mapStateToProps, {
  getProfileData,
  getPicURL,
  updateProfile,
  createErrorMessage,
  clearErrorMessages,
})(formWrapper);
