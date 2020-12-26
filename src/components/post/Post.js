import React from "react";
import { connect } from "react-redux";
import { getPost, clearPost, getLikes } from "../../actions/post";
import { getPostComments } from "../../actions/comment";
import { getProfiles } from "../../actions/social";
import BigSpinner from '../BigSpinner'
import PostDetail from "./PostDetail";

class Post extends React.Component {
  componentDidMount = async () => {
    const postId = this.props.history.location.pathname.split("/")[2];
    await this.props.getPost(postId);
    this.props.getLikes(postId);
    await this.props.getPostComments(postId);
    let profiles = [this.props.post.data.userId];
    this.props.post.comments
      .map((comment) => comment.userId)
      .forEach((commentId) => {
        if (profiles.indexOf(commentId) === -1) {
          profiles.push(commentId);
        }
      });
    this.props.getProfiles(profiles);
  };

  componentWillUnmount() {
    this.props.clearPost();
  }

  render() {
    if (!this.props.post) {
      return <BigSpinner/>;
    } else {
      return (
        <PostDetail
          post={this.props.post}
          profiles={this.props.profiles}
          type="post"
          display={this.props.display}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    profiles: state.profiles,
    display: state.post.display.mode,
  };
};

export default connect(mapStateToProps, {
  getPost,
  clearPost,
  getLikes,
  getPostComments,
  getProfiles,
})(Post);
