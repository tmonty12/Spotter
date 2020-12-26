import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getProfilePosts, deletePost } from "../../actions/posts";
import { getPost, clearPost } from "../../actions/post";
import "./DeletePost.css";

class DeletePost extends React.Component {
  componentDidMount = () => {
    const postId = this.props.location.pathname.split("/")[2];
    this.props.getPost(postId);

    this.props.history.listen((location) => {
      const route = location.pathname.split("/");
      if (route[1] === "posts" && route[3] === "delete") {
        this.props.getPost(route[2]);
      } else {
        this.props.clearPost();
      }
    });
  };

  renderTitle() {
    if (this.props.post.type === "picture") {
      return <span className="delete-post-title">{this.props.post.title}</span>;
    } else if (this.props.post.type === "personalRecord") {
      return (
        <span className="delete-post-title">
          PR: {this.props.post.exercise} {this.props.post.weight}lbsx
          {this.props.post.reps}
        </span>
      );
    } else {
      return (
        <span className="delete-post-title">
          Exercise: {this.props.post.exercise}
        </span>
      );
    }
  }

  onDelete = () => {
    this.props.deletePost(this.props.post.postId);
    this.props.history.push(`/profile/${this.props.userId}`)
  };

  render() {
    if (!this.props.post.userId) {
      return <div>Loading...</div>;
    } else if (this.props.userId !== this.props.post.userId) {
      return <Redirect to={`/posts/${this.props.post.postId}`} />;
    } else {
      return (
        <div className="card delete-post-card">
          <h4 className="card-header">Delete Post</h4>
          <div className="card-body">
            Are you sure you want to delete {this.renderTitle()}?
          </div>
          <div class="card-header d-flex justify-content-between">
            <button
                className="btn btn-danger"
                onClick={this.onDelete}
              >
                Delete
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => this.props.history.goBack()}
              >
                Cancel
              </button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post.data,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, {
  getPost,
  clearPost,
  getProfilePosts,
  deletePost,
})(DeletePost);
