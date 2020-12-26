const INITIAL_STATE = {
  username: null,
  name: null,
  userId: null,
  profilePicURL: null,
  bench1rm: null,
  squat1rm: null,
  deadlift1rm: null,
  instagramUsername: null,
  facebookUsername: null,
  twitterUsername: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_PROFILE_DATA":
      return action.payload;
    case "UPDATE_PROFILE":
      return action.payload;
    case "GET_PROFILE_PIC_URL":
      return { ...state, profilePicURL: action.payload };
    case "UPDATE_PROFILE_PIC_URL":
      return { ...state, profilePicURL: action.payload.url };
    case "CLEAR_PROFILE_DATA":
      return INITIAL_STATE;
    case "SIGN_OUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};
