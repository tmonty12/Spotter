import React from "react";
import { connect } from "react-redux";

class ProfilePic extends React.Component {
  render() {
    if (
      !this.props.userId ||
      this.props.url === null ||
      this.props.url === true
    ) {
      return (
        <div className={`spinner-border text-light ${this.props.classes}`}>
          <span className="sr-only">Loading...</span>
        </div>
      );
    } else if (this.props.url) {
      return (
        <img
          className={this.props.classes}
          src={this.props.url}
          alt="profile"
        ></img>
      );
    } else {
      return <i className={`fas fa-user-circle ${this.props.classes}`}></i>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps)(ProfilePic);
