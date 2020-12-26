import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment } from "../actions/comment";
import ProfilePic from "./profile/ProfilePic";

class Comment extends React.Component {
  renderTimestamp() {
    const currentDate = new Date();
    const postDate = new Date(this.props.comment.timestamp);
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

  renderDeleteIcon() {
    if (this.props.display === "delete") {
      if (
        this.props.userId === this.props.post.userId ||
        this.props.comment.userId === this.props.userId
      ) {
        return (
          <i
            className="fas fa-backspace"
            onClick={() =>
              this.props.deleteComment(
                this.props.type,
                this.props.post.postId,
                this.props.comment.timestamp
              )
            }
          ></i>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  render() {
    return (
      <div className="comment">
        <div className="post-profile">
          <ProfilePic
            size="huge"
            url={this.props.comment.profilePicURL}
            classes="user-icon"
          />
          <Link to={`/profile/${this.props.comment.userId}`}>
            {this.props.comment.username}
          </Link>
        </div>
        <p className="post-comment">{this.props.comment.text}</p>
        <p className="timestamp comment-timestamp">{this.renderTimestamp()}</p>
        {this.renderDeleteIcon()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, { deleteComment })(Comment);
