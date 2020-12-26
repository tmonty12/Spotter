export default (state = [], action) => {
  switch (action.type) {
    case "GET_PROFILE_POSTS":
      const posts = [...state, ...action.payload];
      return posts.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1));
    case "GET_POST_CONTENT_URL":
      let newState = [...state];
      return newState.map((post) =>
        post.postId === action.payload.postId
          ? { ...post, url: action.payload.url }
          : post
      );
    case "GET_POST_FEED_LIKES":
      let newState2 = [...state];
      return newState2.map((post) =>
        post.postId === action.payload.postId
          ? { ...post, likes: action.payload.likes }
          : post
      );
    case "UPDATE_FEED_LIKE":
      let newState3 = [...state];
      return newState3.map((post) =>
        post.postId === action.payload.postId
          ? { ...post, likes: action.payload.likes }
          : post
      );
    case "GET_POST_FEED_COMMENTS":
      let newState4 = [...state];
      return newState4.map((post) =>
        post.postId === action.payload.postId
          ? { ...post, comments: action.payload.comments }
          : post
      );
    case "UPDATE_FEED_COMMENTS":
      let newState5 = [...state];
      return newState5.map((post) =>
        post.postId === action.payload.postId
          ? { ...post, comments: [...post.comments, action.payload.comment] }
          : post
      );
    case "DELETE_FEED_COMMENT":
      let newState6 = [...state];
      return newState6.map((post) =>
        post.postId === action.payload.postId
          ? {
              ...post,
              comments: post.comments.filter(
                (comment) => comment.timestamp !== action.payload.commentId
              ),
            }
          : post
      );
    case "CHANGE_FEED_COMMENT_MODE":
      let newState7 = [...state];
      return newState7.map((post) =>
        post.postId === action.payload.postId
          ? {
              ...post,
              display: action.payload.mode,
            }
          : post
      );
    case "UPDATE_POST":
      let newState8 = [...state];
      return newState8.map((post) =>
        post.postId === action.payload.postId
          ? { ...action.payload, url: post.url }
          : post
      );
    case "UPDATE_POST_CONTENT_URL":
      let newState9 = [...state];
      return newState9.map((post) =>
        post.postId === action.payload.postId
          ? { ...post, url: action.payload.url }
          : post
      );
    case "DELETE_POST":
      let newState10 = [...state];
      return newState10.filter((post) => post.postId !== action.payload);
    case "CLEAR_POSTS":
      return [];
    case "CREATE_POST":
      return [...state, action.payload].sort((a, b) =>
        a.timestamp > b.timestamp ? -1 : 1
      );
    case "SIGN_OUT":
      return [];
    default:
      return state;
  }
};
