const INITIAL_STATE = {
  data: { timestamp: 0, title: "" },
  display: { type: "picture", mode: "default" },
  content: null,
  likes: [],
  comments: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_POST":
      return { ...state, data: action.payload };
    case "CLEAR_POST":
      return { ...INITIAL_STATE };
    case "CHANGE_CREATE_FORM_DISPLAY":
      return {
        ...state,
        display: { type: action.payload, mode: state.display.mode },
      };
    case "GET_POST_DETAIL_URL":
      return { ...state, url: action.payload };
    case "UPDATE_LIKE":
      return { ...state, likes: action.payload.likes };
    case "GET_LIKES":
      return { ...state, likes: action.payload };
    case "CHANGE_COMMENT_MODE":
      return {
        ...state,
        display: { mode: action.payload.mode, type: state.display.type },
      };
    case "GET_POST_COMMENTS":
      return { ...state, comments: action.payload };
    case "UPDATE_COMMENTS":
      return {
        ...state,
        comments: [...state.comments, action.payload.comment],
      };
    case "DELETE_COMMENT":
      const comments = state.comments.filter(
        (comment) => comment.timestamp !== action.payload.commentId
      );
      return { ...state, comments };
    case "SIGN_OUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
