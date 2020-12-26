import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  getPost,
  clearPost,
  changeCreateFormDisplay,
} from "../../actions/post";
import { getProfilePosts, updatePost } from "../../actions/posts";
import EditPicture from "./EditPicture";
import EditPersonalRecord from "./EditPersonalRecord";
import EditNewExercise from "./EditNewExercise";

class EditPost extends React.Component {
  componentDidMount = () => {
    const postId = this.props.location.pathname.split("/")[2];
    this.props.getPost(postId);
  };

  renderForm() {
    const requireFileInput = this.props.initialValues.url ? true : false;
    if (this.props.initialValues.type === "picture") {
      return (
        <EditPicture
          initialValues={this.props.initialValues}
          onSubmit={this.onUpdatePost}
          buttonText="Update"
          cancelRoute={`/posts/${this.props.initialValues.postId}`}
          requireFileInput={requireFileInput}
        />
      );
    } else if (this.props.initialValues.type === "personalRecord") {
      return (
        <EditPersonalRecord
          initialValues={this.props.initialValues}
          onSubmit={this.onUpdatePost}
          buttonText="Update"
          cancelRoute={`/posts/${this.props.initialValues.postId}`}
          requireFileInput={requireFileInput}
        />
      );
    } else {
      return (
        <EditNewExercise
          initialValues={this.props.initialValues}
          onSubmit={this.onUpdatePost}
          buttonText="Update"
          cancelRoute={`/posts/${this.props.initialValues.postId}`}
          requireFileInput={requireFileInput}
        />
      );
    }
  }

  onUpdatePost = (formValues) => {
    this.props.updatePost(formValues);
    this.props.history.goBack();
  };

  render() {
    if (!this.props.initialValues.userId) {
      return <div>Loading...</div>;
    } else if (this.props.userId !== this.props.initialValues.userId) {
      return <Redirect to={`/posts/${this.props.initialValues.postId}`} />;
    } else {
      return (
          <div className="card form-card">
            <div className="card-body">{this.renderForm()}</div>
          </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    initialValues: state.post.data,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, {
  getPost,
  clearPost,
  changeCreateFormDisplay,
  getProfilePosts,
  updatePost,
})(EditPost);
