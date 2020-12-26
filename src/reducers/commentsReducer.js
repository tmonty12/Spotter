export default (state = null, action) => {
  switch (action.type) {
    case "GET_POST_COMMENTS":
      return action.payload;
    case "UPDATE_COMMENTS":
      return [...state, action.payload];
    case "CLEAR_POST_COMMENTS":
      return [];
    case "DELETE_COMMENT":
      const comments = state.filter(
        (comment) => comment.timestamp !== action.payload
      );
      return comments;
    case "SIGN_OUT":
      return null;
    default:
      return state;
  }
};
