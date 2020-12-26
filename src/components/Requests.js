import React from "react";
import { connect } from "react-redux";
import { getFollowerRequests } from "../actions/request";
import { getProfiles } from "../actions/social";
import RequestListItem from "./RequestListItem";
import "./Requests.css";

class Requests extends React.Component {
  componentDidMount = async () => {
    if (!this.props.requests || this.props.requests.length === 0) {
      await this.props.getFollowerRequests();
    }
    const requests = this.props.requests.map((request) => request.userId);
    this.props.getProfiles(requests);
  };

  render() {
    if (!this.props.requests) {
      return (
        <div className="requests-container">
          <h2 className="request-title ui segment">Requests</h2>
          <p>Loading...</p>
        </div>
      );
    } else {
      if (this.props.requests.length > 0 && this.props.profiles) {
        let requests = [];
        this.props.profiles.forEach((profile) => {
          this.props.requests.forEach((request) => {
            if (profile.userId === request.userId) {
              requests.push({ ...profile, timestamp: request.timestamp });
            }
          });
        });
        requests = requests.map((request) => (
          <RequestListItem request={request} key={request.userId} />
        ));
        return (
          <div className="requests-container">
            <div className="card request-title-card">
                <div className="card-body">
                    <h4>Requests</h4>
                </div>
              </div>
            {requests}
          </div>
        );
      } else {
        return (
          <div className="requests-container">
            <div className="card request-title-card">
                <div className="card-body">
                    <h4>Requests</h4>
                </div>
              </div>
              <div className="no-new-requests-container">
                <h4 className="request-title">You have no new requests</h4>
                <i className="fas fa-user-slash"></i>
              </div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = (state) => {
  return {
    requests: state.requests,
    profiles: state.profiles,
  };
};

export default connect(mapStateToProps, { getFollowerRequests, getProfiles })(
  Requests
);
