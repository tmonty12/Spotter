import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getSocialData, getProfiles } from "../actions/social";
import { getProfilePosts } from "../actions/posts";
import FeedPost from "./post/FeedPost";
import BigSpinner from './BigSpinner';
import "./Feed.css";

class Feed extends React.Component {
  componentDidMount = async () => {
      await this.props.getSocialData("isFollowing", this.props.auth.userId);
      if(this.props.social.following){
        await this.props.social.following.forEach((follower) =>
          this.props.getProfilePosts(follower)
        );
        this.props.getProfilePosts(this.props.auth.userId);

        this.props.getProfiles([...this.props.social.following, this.props.auth.userId]);
      }
  };

  renderPosts = (posts) => {
    const feedPosts = posts.map((post) => (
      <FeedPost postId={post.postId} key={post.postId} />
    ));
    return (
      <div>
          <Link to="/posts/create" className="btn btn-primary create-post-btn">
            <i className="fas fa-plus"></i>
          </Link>
        {feedPosts}
      </div>
    );
  }

  render() {
    const nonTmontyPosts = this.props.posts.filter(post => post.userId != 'wrfWCz04OHOw8e0lZTEopQ7w1lj1');
    if (nonTmontyPosts.length > 0) {
      return this.renderPosts(this.props.posts)
    } else if (this.props.displayWelcomeMessage) {
      const tmontyPosts = this.props.posts.filter(post => post.userId === 'wrfWCz04OHOw8e0lZTEopQ7w1lj1');
      return (
        <div className="display-welcome-message">
          <h1>Tutorial Video</h1>
          <video
            src={require('../imgs/Spotter Tutorial.mp4')}
            controls
          />
          {tmontyPosts.length > 0 ? (
            <>
              <h1>Posts</h1>
              {this.renderPosts(tmontyPosts)}
            </>
            ) : null}
        </div>
      );
    } else {
      return <BigSpinner />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts,
    social: state.social,
    displayWelcomeMessage: state.auth.displayWelcomeMessage,
  };
};

export default connect(mapStateToProps, {
  getSocialData,
  getProfilePosts,
  getProfiles,
})(Feed);
