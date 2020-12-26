import React from "react";
import { connect } from "react-redux";
import { changeCreateFormDisplay } from "../../actions/post";
import { getProfilePosts, createPost } from "../../actions/posts";
import PostForm from "./PostForm";

class CreatePost extends React.Component {
  onCreatePost = async (formValues) => {
    await this.props.createPost(formValues, this.props.userId);
    
    this.props.history.goBack();
  };

  render() {
    return (
      <div className="form-container">
        <PostForm onSubmit={this.onCreatePost}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedMenu: state.post.display.type,
    userId: state.auth.userId,
  };
};

export default connect(mapStateToProps, {
  changeCreateFormDisplay,
  getProfilePosts,
  createPost,
})(CreatePost);
