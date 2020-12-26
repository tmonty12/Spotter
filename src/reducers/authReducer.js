const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  userPicURL: null,
  username: null,
  signUpErrorMessage: null,
  logInErrorMessage: null,
  editProfileErrorMessage: null,
  displayWelcomeMessage: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CREATE_SIGN_UP_ERROR_MESSAGE":
      return { ...state, signUpErrorMessage: action.payload };
    case "CREATE_LOG_IN_ERROR_MESSAGE":
      return { ...state, logInErrorMessage: action.payload };
    case "CLEAR_ERROR_MESSAGES":
      return { ...state, logInErrorMessage: null, signUpErrorMessage: null };
    case "LOGGED_IN":
      return { ...state, isSignedIn: true, userId: action.payload };
    case "SIGN_OUT":
      return { ...INITIAL_STATE, isSignedIn: false };
    case "GET_USER_PIC_URL":
      return { ...state, userPicURL: action.payload };
    case "SET_NO_USER_PIC_URL":
      return { ...state, userPicURL: false };
    case "GET_USER_DISPLAY_NAME":
      return { ...state, username: action.payload };
    case "GET_PROFILE_POSTS":
      return { ...state, displayWelcomeMessage: true };
    case "UPDATE_PROFILE":
      return { ...state, username: action.payload.username };
    case "CREATE_EDIT_PROFILE_ERROR_MESSAGE":
      return { ...state, editProfileErrorMessage: action.payload };
    default:
      return state;
  }
};
