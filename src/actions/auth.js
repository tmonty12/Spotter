import firebase from "../firebase";

export const createErrorMessage = (location, message) => (dispatch) => {
  if (location === "signUp") {
    dispatch({ type: "CREATE_SIGN_UP_ERROR_MESSAGE", payload: message });
  } else if (location === "logIn") {
    dispatch({ type: "CREATE_LOG_IN_ERROR_MESSAGE", payload: message });
  } else if (location === "editProfile") {
    dispatch({ type: "CREATE_EDIT_PROFILE_ERROR_MESSAGE", payload: message });
  }
};

export const clearErrorMessages = () => {
  return {
    type: "CLEAR_ERROR_MESSAGES",
  };
};

export const setUserStatus = (user) => (dispatch) => {
  if (user) {
    dispatch({ type: "LOGGED_IN", payload: user.uid });
  } else {
    dispatch({ type: "SIGN_OUT" });
  }
};

export const getUserDisplayName = (displayName) => {
  return {
    type: "GET_USER_DISPLAY_NAME",
    payload: displayName,
  };
};

export const getPicURL = (type, userId) => (dispatch) => {
  const storageRef = firebase.storage().ref();
  const profilePicRef = storageRef.child(`profilePics/${userId}`);
  profilePicRef
    .getDownloadURL()
    .then((url) => dispatch({ type, payload: url }));
};

export const setNoUserPicURL = () => {
  return {
    type: "SET_NO_USER_PIC_URL",
  };
};
