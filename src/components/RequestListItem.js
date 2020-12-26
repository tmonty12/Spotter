import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "../firebase";
import { getFollowerRequests } from "../actions/request";
import ProfilePic from "./profile/ProfilePic";

class RequestListItem extends React.Component {
  renderTimeStamp() {
    const currentDate = new Date();
    const postDate = new Date(this.props.request.timestamp);
    const hourDif =
      (currentDate.getTime() - postDate.getTime()) / (1000 * 60 * 60);
    if (hourDif > currentDate.getHours() + 24) {
      return `${Math.round(hourDif / 24)} days ago`;
    } else {
      const hours =
        postDate.getHours() > 12
          ? postDate.getHours() - 12
          : postDate.getHours();
      const minutes =
        postDate.getMinutes().toString().length === 1
          ? "0" + postDate.getMinutes().toString()
          : postDate.getMinutes();
      const tod = postDate.getHours() > 11 ? "pm" : "am";
      const day = hourDif > currentDate.getHours() ? "Yesterday" : "Today";
      return `${day} at ${hours}:${minutes} ${tod}`;
    }
  }

  onBtnClick = (status) => {
    const { userId } = this.props;
    const profileId = this.props.request.userId;
    firebase
      .firestore()
      .collection("profiles")
      .doc(userId)
      .collection("social")
      .doc(profileId)
      .update({ isFollower: status });
    firebase
      .firestore()
      .collection("profiles")
      .doc(profileId)
      .collection("social")
      .doc(userId)
      .update({ isFollowing: status });
    this.props.getFollowerRequests();
  };

  render() {
    return (
      <div key={this.props.request.userId} className="card request-card">
        <div className="card-body d-flex justify-content-between">
          <div className="d-flex">
            <ProfilePic url={this.props.request.profilePicURL} classes="request-item-icon" />
            <span className="request-header">
              <Link to={`/profile/${this.props.request.userId}`}>
                {this.props.request.username}
              </Link>{" "}
            </span>
          </div>
        <div className="timestamp">{this.renderTimeStamp()}</div>
        <div className="request-btns">
          <button
            className="btn btn-primary"
            onClick={() => this.onBtnClick("accepted")}
          >
            Accept
          </button>
          <button className="btn btn-danger" onClick={() => this.onBtnClick(null)}>
            Deny
          </button>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, {
  getFollowerRequests,
})(RequestListItem);
