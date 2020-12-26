import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import { createErrorMessage, clearErrorMessages } from "../../actions/auth.js";
import firebase from "../../firebase";
import ErrorMessage from "../ErrorMessage";
import FormField from "../FormField";
import "./AuthForm.css";

class LogIn extends React.Component {
  componentWillUnmount() {
    this.props.clearErrorMessages();
  }

  renderLogInError() {
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

  onLogIn = ({ email, password }) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => this.props.createErrorMessage("logIn", error.message));
  };

  renderFields() {
    const fields = [
      { name: "email", inputType: "input", label: "Email", type: "email" },
      {
        name: "password",
        inputType: "input",
        label: "Password",
        type: "password",
      },
    ];
    return fields.map((field) => <FormField {...field} key={field.name} />);
  }

  render() {
    return (
      <div className="card auth-card">
        <div className="card-body">
          <h5 className="card-title auth-title">Log In</h5>
          <form
            onSubmit={this.props.handleSubmit(this.onLogIn)}
            className="ui form error"
          >
            {this.renderFields()}
            {this.renderLogInError()}
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
            <Link to="/signup">
              <p id="sign-up-message">Don't have an account? Sign up here</p>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.logInErrorMessage,
  };
};

const validate = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "You must enter an email";
  }
  if (!formValues.password) {
    errors.password = "You must enter a password";
  }
  return errors;
};

const formWrapped = reduxForm({
  form: "logIn",
  validate,
})(LogIn);

export default connect(mapStateToProps, {
  createErrorMessage,
  clearErrorMessages,
})(formWrapped);
