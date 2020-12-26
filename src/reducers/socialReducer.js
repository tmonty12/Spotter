const INITIAL_STATE = {
  isFollower: null,
  isFollowing: null,
  userId: null,
  followers: null,
  following: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_SOCIAL_STATUS":
      return action.payload ? { ...state, ...action.payload } : state;
    case "UPDATE_FOLLOWING_STATUS":
      return { ...state, isFollowing: action.payload };
    case "GET_FOLLOWERS":
      return {
        ...state,
        followers: action.payload,
      };
    case "GET_FOLLOWING":
      return {
        ...state,
        following: action.payload,
      };
    case "CLEAR_SOCIAL_DATA":
      return INITIAL_STATE;
    case "SIGN_OUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
