import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import {
  createComment,
  clearPostComments,
  changeCommentMode,
} from "../../actions/comment";
import { updateLike } from "../../actions/post";
import ProfilePic from "../profile/ProfilePic";
import Comment from "../Comment";
import BigSpinner from '../BigSpinner'
import "./PostDetail.css";

class PostDetail extends React.Component {
  renderTimeStamp() {
    const currentDate = new Date();
    const postDate = new Date(this.props.post.data.timestamp);
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

  renderHeaderTitle() {
    if (this.props.post.data.type === "picture") {
      return (
          <h5 className="post-detail-title">
            <Link to={`/posts/${this.props.post.data.postId}`}>
              {this.props.post.data.title}
            </Link>
          </h5>
      );
    } else if (this.props.post.data.type === "newExercise") {
      return (
        <h5>
            Exercise:{" "}
            <Link to={`/posts/${this.props.post.data.postId}`}>
              {this.props.post.data.exercise}
            </Link>
        </h5>
      );
    } else {
      return (
        <h5 className="post-detail-title">
            Personal Record:{" "}
            <Link to={`/posts/${this.props.post.data.postId}`}>
              {this.props.post.data.exercise} {this.props.post.data.weight}lbs x {this.props.post.data.reps}
            </Link>
        </h5>
      );
    }
  }

  renderContent() {
    if (!this.props.post.data.type || !this.props.post.url) {
      return (<div className={`spinner-border text-light ${this.props.classes}`}>
                <span className="sr-only">Loading...</span>
              </div>);
    }
    if (this.props.post.data.type === "picture") {
      return (
        <img
          className="post-detail-visual"
          src={this.props.post.url}
          alt={this.props.post.data.title}
        />
      );
    } else {
      return (
        <video
          controls
          className="post-detail-visual"
          src={this.props.post.url}
        />
      );
    }
  }

  renderOwnComment() {
    if (this.props.post.data.type === "newExercise") {
      const lis = this.props.post.data.targetedMuscles.map((muscle) => (
        <li key={muscle}>{muscle}</li>
      ));
      return (
        <>
          <p>
            {this.props.post.data.comment}
          </p>
          <h4>Targeted Muscles:</h4>
          <ul className="targeted-muscles-list">{lis}</ul>
        </>
      );
    } else {
      return (
        <p>
          {this.props.post.data.comment}
        </p>
      );
    }
  }

  renderInput(formProps) {
    return (
      <input
        type="text"
        className="form-control"
        {...formProps.input}
        placeholder={formProps.placeholder}
      />
    );
  }

  onComment = ({ comment }) => {
    this.props.createComment(
      this.props.type,
      this.props.post.data.postId,
      comment
    );
    this.props.reset();
  };

  renderComments() {
    if (this.props.post.comments) {
      let comments = [];
      this.props.post.comments.forEach((comment) => {
        this.props.profiles.forEach((profile) => {
          if (profile.userId === comment.userId) {
            comments.push({ ...profile, ...comment });
          }
        });
      });
      return comments.map((comment) => (
        <Comment
          comment={comment}
          key={comment.timestamp}
          post={this.props.post.data}
          type={this.props.type}
          display={this.props.display}
        />
      ));
    } else {
      return null;
    }
  }

  renderSettingsIcon() {
    if (this.props.post.data.userId === this.props.auth.userId) {
      return (
        <>
        <i className="fas fa-ellipsis-v dropdown-toggle" data-toggle="dropdown"></i>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to={`/posts/${this.props.post.data.postId}/edit`}>Edit Post</Link>
              <Link className="dropdown-item" to={`/posts/${this.props.post.data.postId}/delete`}>Delete Post</Link>
              <div
                className="dropdown-item"
                onClick={() =>
                  this.props.changeCommentMode(
                    this.props.type,
                    "delete",
                    this.props.post.data.postId
                  )
                }
              >
                Manage Comments
              </div>
            </div>
          </>
      );
    } else {
      return (
        <>
        <i className="fas fa-ellipsis-v dropdown-toggle" data-toggle="dropdown"></i>
            <div className="dropdown-menu dropdown-menu-right">
              <div
                className="dropdown-item"
                onClick={() =>
                  this.props.changeCommentMode(
                    this.props.type,
                    "delete",
                    this.props.post.data.postId
                  )
                }
              >
                Delete your comments
              </div>
            </div>
          </>)
    }
  }

  createLike = () => {
    this.props.updateLike(this.props.type, this.props.post.data.postId);
  };

  render() {
    if (!this.props.post) {
      return null;
    } else {
      let className;
      if (!this.props.post.likes) {
        className = "fas fa-heart";
      } else {
        className =
          this.props.post.likes.indexOf(this.props.auth.userId) === -1
            ? "fas fa-heart"
            : "fas fa-heart post-liked";
      }
      const profile = this.props.profiles.filter(
        (profile) => profile.userId === this.props.post.data.userId
      )[0];
      return (
        <div className="card post-detail">
          <div className="card-header post-header d-flex justify-content-between">
            <div className="post-profile">
                <ProfilePic
                  size="huge"
                  url={profile ? profile.profilePicURL : null}
                  classes="user-icon"
                />
                <Link
                  to={`/profile/${this.props.post.data.userId}`}
                >{profile ? profile.username : null}</Link>
            </div>
            <div className="timestamp">{this.renderTimeStamp()}</div>
          </div>
          <div className="card-body post-body">
              {this.renderHeaderTitle()}
              {this.renderContent()}
              {this.renderOwnComment()}
          </div>
          <div className="card-header">
            <div className="d-flex justify-content-between">
              <div className="like-btn-container">
                <i className={className} onClick={this.createLike}></i>
                <span>{this.props.post.likes ? this.props.post.likes.length : 0} likes</span>
              </div>
              {this.renderSettingsIcon()}
            </div>
            <div>
            {this.props.display === "delete" ? (
                <button
                onClick={() =>
                  this.props.changeCommentMode(
                    this.props.type,
                    "default",
                    this.props.post.data.postId
                  )
                }
                  className="btn btn-danger btn-block edit-comments-btn"
                >
                  Done
                </button>
              ) : null}
            <div className="comment">
                <div className="post-profile">
                  <ProfilePic
                    size="huge"
                    url={this.props.auth.userPicURL}
                    classes="user-icon"
                  />
                  <Link to={`/profile/${this.props.auth.userId}`}>
                    {this.props.auth.username}
                  </Link>
                </div>
                <form onSubmit={this.props.handleSubmit(this.onComment)}>
                  <div className="input-group">
                    <Field
                      component={this.renderInput}
                      placeholder="Write a comment..."
                      name="comment"
                    />
                    <div className="input-group-append">
                      <button type="submit" className="input-group-text">
                        <i className="fas fa-comment"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              {this.renderComments()}
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    profiles: state.profiles,
    auth: state.auth,
  };
};

const formWrapper = reduxForm({
  form: "comment",
})(withRouter(PostDetail));

export default connect(mapStateToProps, {
  createComment,
  clearPostComments,
  updateLike,
  changeCommentMode,
})(formWrapper);
