import React from "react";
import { connect } from "react-redux";
import PictureForm from "./CreatePicture";
import PersonalRecordForm from "./CreatePersonalRecord";
import NewExerciseForm from "./CreateNewExercise";
import "./PostForm.css";
import "./Form.css";

class CreatePost extends React.Component {
  render() {
    return (
      <div className="form-card post-form">
        <nav>
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <a className="nav-link active" id="nav-home-tab" data-toggle="tab" href="#picture" role="tab">Picture</a>
            <a className="nav-link" id="nav-profile-tab" data-toggle="tab" href="#personal-record" role="tab">Personal Record</a>
            <a className="nav-link" id="nav-contact-tab" data-toggle="tab" href="#new-exercise" role="tab">New Exercise</a>
          </div>
        </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="picture" role="tabpanel">
          <PictureForm
              onSubmit={this.props.onSubmit}
              initialValues={{ type: "picture" }}
              buttonText="Create"
              cancelRoute="/"
            />
        </div>
        <div className="tab-pane fade" id="personal-record" role="tabpanel">
          <PersonalRecordForm
              onSubmit={this.props.onSubmit}
              initialValues={{ type: "personalRecord" }}
              buttonText="Create"
              cancelRoute="/"
            />
        </div>
        <div className="tab-pane fade" id="new-exercise" role="tabpanel">
          <NewExerciseForm
              onSubmit={this.props.onSubmit}
              initialValues={{ type: "newExercise" }}
              buttonText="Create"
              cancelRoute="/"
            />
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

export default connect(mapStateToProps)(
  CreatePost
);
