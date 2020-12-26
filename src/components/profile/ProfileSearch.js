import React from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileSearch } from "../../actions/profileSearch";
import { getProfiles } from "../../actions/social";
import ProfileCard from "./ProfileCard.js";
import "./ProfileSearch.css";

class ProfileSearch extends React.Component {
  componentDidMount = async () => {
    const query = this.props.history.location.search.split("=")[1];
    await this.props.getProfileSearch(query);
    this.props.getProfiles(this.props.searchProfiles);
    this.props.history.listen(async (location) => {
      if (location.search !== "") {
        const query = location.search.split("=")[1];
        await this.props.getProfileSearch(query);
        this.props.getProfiles(this.props.searchProfiles);
      }
    });
  };

  renderInput = (formProps) => {
    return (
      <input
        type="text"
        {...formProps.input}
        placeholder={formProps.placeholder}
      />
    );
  };

  onSearch = ({ search }) => {
    if (search) {
      this.props.history.push(`/profile/search?query=${search}`);
      this.props.reset();
    }
  };

  renderProfiles = () => {
    const profiles = [];
    if (this.props.profiles && this.props.searchProfiles) {
      this.props.profiles.forEach((profile) => {
        this.props.searchProfiles.forEach((profileSearchId) => {
          if (profile.userId === profileSearchId) {
            profiles.push(profile);
          }
        });
      });
    }
    if (!profiles) {
      return null;
    } else {
      return profiles.map((profile) => (
        <ProfileCard profile={profile} key={profile.userId} />
      ));
    }
  };

  render() {
    return (
        <div className="profile-card-grid">{this.renderProfiles()}</div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
    searchProfiles: state.profileSearch,
  };
};

const formWrapper = reduxForm({
  form: "profileSearch",
})(ProfileSearch);

export default connect(mapStateToProps, {
  getProfileSearch,
  getProfiles,
})(formWrapper);
