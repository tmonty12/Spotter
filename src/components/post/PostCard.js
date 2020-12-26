import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { getPostContentURL } from "../../actions/posts";
import "./PostCard.css";

class PostCard extends React.Component {
  renderTimeStamp() {
    const currentDate = new Date();
    const postDate = new Date(this.props.post.timestamp);
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

  renderVisual() {
    if (!this.props.post.url) {
      this.props.getPostContentURL(this.props.post.postId);
    }
    if (this.props.post.type === "picture") {
      return (
        <img
          src={this.props.post.url}
          alt={this.props.post.title}
          className="card-img-top"
        />
      );
    } else {
      return (
        <video
          controls
          src={this.props.post.url}
          alt={this.props.post.title}
          className="card-img-top"
        />
      );
    }
  }

  renderTitle() {
    if (this.props.post.type === "picture") {
      return (
        <Link
          className="card-title"
          to={`/posts/${this.props.post.postId}`}
        >
          <h5>{this.props.post.title}</h5>
        </Link>
      );
    } else if (this.props.post.type === "personalRecord") {
      return (
        <h5 className="card-title">PR:
          <Link
            to={`/posts/${this.props.post.postId}`}
            
          >
            {" "}{this.props.post.exercise}{" "}{this.props.post.weight}x{this.props.post.reps}
          </Link>
        </h5>
      );
    } else {
      return (
        <h5 className="card-title">Exercise: 
          <Link
            to={`/posts/${this.props.post.postId}`}
          >
            {" "}{this.props.post.exercise}
          </Link>
        </h5>
      );
    }
  }

  renderSubContent() {
    if (this.props.userId !== this.props.post.userId) {
      return (
        <div className="timestamp" style={{textAlign: 'center'}}>{this.renderTimeStamp()}</div>
      );
    } else {
      return (
        <div className="d-flex justify-content-between actions-row">
          <div></div>
          <div className="timestamp">
            {this.renderTimeStamp()}
          </div>
            <i className="fas fa-ellipsis-v dropdown-toggle" data-toggle="dropdown"></i>
            <div className="dropdown-menu dropdown-menu-right">
              <Link className="dropdown-item" to={`/posts/${this.props.post.postId}/edit`}>Edit Post</Link>
              <Link className="dropdown-item" to={`/posts/${this.props.post.postId}/delete`}>Delete Post</Link>
            </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="card post-card">
        {this.renderVisual()}
        <div className="card-body">
          {this.renderTitle()}
          <p className="card-text post-description">{this.props.post.comment}</p>
          {this.renderSubContent()}
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

export default connect(mapStateToProps, { getPostContentURL })(
  withRouter(PostCard)
);
