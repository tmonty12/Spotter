import firebase from "../firebase";

export const getProfileData = (profileId) => async (dispatch) => {
  const db = firebase.firestore();
  await db.collection("profiles")
    .doc(profileId)
    .get()
    .then((doc) => {
      dispatch({
        type: "GET_PROFILE_DATA",
        payload: { ...doc.data() },
      });
      if (doc.data().profilePicURL) {
        const profilePicRef = firebase
          .storage()
          .ref()
          .child(`profilePics/${profileId}`);
        profilePicRef
          .getDownloadURL()
          .then((url) =>
            dispatch({ type: "GET_PROFILE_PIC_URL", payload: url })
          );
      }
    });
};

export const updateProfile = (formValues, userId) => (dispatch, getState) => {
  const { profilePic, ...rest } = formValues;
  const db = firebase.firestore();
  const profilePicURL = getState().profile.profilePicURL
    ? true
    : profilePic
    ? true
    : false;
  db.collection("profiles")
    .doc(`${userId}`)
    .set({
      ...rest,
      profilePicURL,
    })
    .then(async () => {
      if (profilePic) {
        const file = profilePic[0];
        const storageRef = firebase.storage().ref();
        const profilePicRef = storageRef.child(`profilePics/${userId}`);
        await profilePicRef.put(file);
      }
    })
    .then(() => {
      const storageRef = firebase.storage().ref();
      const profilePicRef = storageRef.child(`profilePics/${userId}`);
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { ...rest, profilePicURL },
      });
      profilePicRef.getDownloadURL().then((url) => {
        dispatch({ type: "UPDATE_PROFILE_PIC_URL", payload: { url, userId } });
        dispatch({ type: "GET_USER_PIC_URL", payload: url });
      });
    });
};

export const getAllProfiles = () => (dispatch, getState) => {
  const profiles = [];
  firebase
    .firestore()
    .collection("profiles")
    .get()
    .then((response) => {
      response.docs.forEach((profile) => {
        if (profile.data().userId === getState().auth.userId) {
          profiles.push(profile.data());
        }
      });
    })
    .then(() => dispatch({ type: "GET_ALL_PROFILES", payload: profiles }));
};

export const clearProfileData = () => {
  return {
    type: "CLEAR_PROFILE_DATA",
  };
};
