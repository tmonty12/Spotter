import React from "react";
import { connect } from "react-redux";
import {
  getPostContentURL,
  getPostFeedLikes,
  getPostFeedComments,
} from "../../actions/posts";
import BigSpinner from '../BigSpinner';
import PostDetail from "./PostDetail";

class FeedPost extends React.Component {
  componentDidMount() {
    this.props.getPostContentURL(this.props.postId);
    this.props.getPostFeedLikes(this.props.postId);
    this.props.getPostFeedComments(this.props.postId);
  }

  render() {
    if (!this.props.posts) {
      return <BigSpinner />;
    } else {
      let post = this.props.posts.filter(
        (post) => post.postId === this.props.postId
      )[0];
      const display = post.display;
      post = {
        data: {
          ...post,
        },
        url: post.url,
        likes: post.likes,
        comments: post.comments,
      };
      const profile = this.props.profiles.filter(
        (profile) => profile.userId === post.data.userId
      )[0];
      return (
        <PostDetail
          post={post}
          profile={profile}
          profiles={this.props.profiles}
          type="feedPost"
          display={display}
        />
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    profiles: state.profiles,
  };
};

export default connect(mapStateToProps, {
  getPostContentURL,
  getPostFeedLikes,
  getPostFeedComments,
})(FeedPost);
