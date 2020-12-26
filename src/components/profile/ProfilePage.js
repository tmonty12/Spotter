import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getProfilePosts, clearPosts } from "../../actions/posts";
import { getFollowerRequests } from "../../actions/request";
import { getProfileData, clearProfileData } from "../../actions/profile";
import { getPicURL } from "../../actions/auth";
import {
  getSocialData,
  clearSocialData,
  getSocialStatus,
  updateFollowingStatus,
} from "../../actions/social";
import Profile from './Profile';
import PostCard from '../post/PostCard';
import BigSpinner from '../BigSpinner';

class ProfilePage extends React.Component {
    componentDidMount() {
        this.profileId = this.props.location.pathname.split("/")[2];
        this.getProfile(this.profileId);

        this.unlisten = this.props.history.listen(location => {
          const [ _ , page, userId] = location.pathname.split('/')
          const isVisitingAnotherProfile = page === 'profile' && userId !== this.profileId && userId !== "search"
          if(isVisitingAnotherProfile){
            this.getProfile(userId)
            this.profileId = userId
          }
        })
      }

      componentWillUnmount() {
        this.props.clearProfileData()
        this.props.clearSocialData()
        this.unlisten()
      }
    
      async getProfile(profileId) {
          await this.props.getProfileData(profileId);
          
          const isOwnProfile = this.profileId === this.props.auth.userId
          if(isOwnProfile){
            await this.props.getFollowerRequests()
          } else {
            this.props.getSocialStatus(profileId);
          }

          await this.props.getSocialData("isFollower", profileId);
          await this.props.getSocialData("isFollowing", profileId); // getProfilePosts relies on the result of this action
          

          const isFollowing = this.props.isFollowing === "accepted"
          if(isOwnProfile || isFollowing) this.props.getProfilePosts(profileId);
      }
    
      onFriendBtnClick = () => {
        this.props.updateFollowingStatus(this.props.profile.userId);
      };

    renderPosts() {
      const profilePosts = this.props.posts.filter((post) => post.userId === this.props.profile.userId);
        if (profilePosts.length > 0) {
          const isFollowing = this.props.social.isFollowing === "accepted";
          const isOwnProfile = this.props.profile.userId === this.props.auth.userId;
          if (isFollowing || isOwnProfile) {
              const posts = profilePosts.map((post) => {
                return <PostCard post={post} key={post.postId} />;
              });
            return (
                <div className="posts-container">{posts}</div>
            );
          } else {
            return (
                <div className="posts-container icon-posts-container">
                  <i className="fas fa-user-lock"></i>
                </div>
            );
          }
        } else {
          return (
              <div className="posts-container icon-posts-container">
                <i className="fas fa-plus-circle"></i>
                <h4>
                  {this.props.profile.userId === this.props.auth.userId
                    ? "Create a post"
                    : "This user has no posts"}
                </h4>
              </div>
          );
        }
      }
    
    render() {
        const isNewProfileLoaded = this.profileId === this.props.profile.userId
        const isAllDataLoaded = !(!this.props.social.following || !this.props.social.followers)
        if (!isNewProfileLoaded || !isAllDataLoaded) { //following is the last thing to be fetched
            return <BigSpinner />;
        } else {
            return (
                <div className="profile">
                  <Profile onFriendBtnClick={this.onFriendBtnClick}/>
                  <div>
                    <div className="card posts-title-card">
                      <div className="card-body d-flex justify-content-between">
                        <div></div>
                        <h4>Posts</h4>
                        {this.props.profile.userId === this.props.auth.userId ? (
                          <Link to="/posts/create">
                            <i className="far fa-plus-square"></i>
                          </Link>) : (<div></div>)}
                      </div>
                    </div>
                  </div>
                  {this.renderPosts()}
                </div>
              );
        }
    }
    
}

const mapStateToProps = (state) => {
    return {
      posts: state.posts,
      profile: state.profile,
      social: state.social,
      requests: state.requests,
      auth: state.auth
    };
  };

export default connect(mapStateToProps, {
    getProfilePosts,
    clearPosts,
    getProfileData,
    getPicURL,
    clearProfileData,
    getSocialStatus,
    updateFollowingStatus,
    getFollowerRequests,
    getSocialData,
    clearSocialData,
})(ProfilePage);