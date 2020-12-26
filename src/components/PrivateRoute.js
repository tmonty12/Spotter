import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import BigSpinner from './BigSpinner';

class PrivateRoute extends React.Component {
  determineComponent() {
    let redirectRoute = "/";
    let userAcceptanceOn = true;
    this.props.accessType === "onSignedIn"
      ? (redirectRoute = "/login")
      : (userAcceptanceOn = false);
    if (this.props.isSignedIn === null) {
      return <Route to={this.props.path}><BigSpinner /></Route>;
    } else if (this.props.isSignedIn === userAcceptanceOn) {
      return <Route to={this.props.path} component={this.props.component} />;
    } else {
      return <Redirect to={redirectRoute} />;
    }
  }

  render() {
    return (<div style={{marginBottom: '5%'}}>
      {this.determineComponent()}
          </div>)
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
  };
};

export default connect(mapStateToProps)(PrivateRoute);
