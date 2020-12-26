import firebase from "../firebase";

export const getSocialStatus = (profileId) => (dispatch, getState) => {
  firebase
    .firestore()
    .collection("profiles")
    .doc(getState().auth.userId)
    .collection("social")
    .doc(profileId)
    .get()
    .then((doc) => {
      dispatch({ type: "GET_SOCIAL_STATUS", payload: doc.data() });
    });
};

export const updateFollowingStatus = (profileId) => (dispatch, getState) => {
  let payload;
  switch (getState().social.isFollowing) {
    case "accepted":
      payload = null;
      break;
    default:
      payload = "requested";
  }
  const followingRef = firebase
    .firestore()
    .collection("profiles")
    .doc(getState().auth.userId)
    .collection("social")
    .doc(profileId);
  followingRef.get().then((doc) => {
    if (doc.exists) {
      followingRef.update({ isFollowing: payload });
    } else {
      followingRef.set({ isFollowing: payload, userId: profileId });
    }
  });
  const date = new Date();
  const followerRef = firebase
    .firestore()
    .collection("profiles")
    .doc(profileId)
    .collection("social")
    .doc(getState().auth.userId);
  followerRef.get().then((doc) => {
    if (doc.exists) {
      followerRef.update({ isFollower: payload, timestamp: date.getTime() });
    } else {
      followerRef.set({
        isFollower: payload,
        userId: getState().auth.userId,
        timestamp: date.getTime(),
      });
    }
  });
  dispatch({ type: "UPDATE_FOLLOWING_STATUS", payload });
};

export const getSocialData = (dataType, profileId) => async (dispatch) => {
  let payload = [];
  const type = dataType === "isFollower" ? "GET_FOLLOWERS" : "GET_FOLLOWING";
  await firebase
    .firestore()
    .collection("profiles")
    .doc(profileId)
    .collection("social")
    .where(dataType, "==", "accepted")
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) => payload.push(doc.data().userId))
    )
    .then(() => dispatch({ type, payload }));
};

export const getProfiles = (profiles) => (dispatch, getState) => {
  if (profiles) {
    profiles.forEach((newProfileId) => {
      const isProfileFetched = getState().profiles.filter(
        (profile) => profile.userId === newProfileId
      );
      if (isProfileFetched.length === 0) {
        const profile = { userId: newProfileId };
        firebase
          .firestore()
          .collection("profiles")
          .doc(newProfileId)
          .get()
          .then((doc) => {
            profile.username = doc.data().username;
            profile.profilePicURL = doc.data().profilePicURL;
          })
          .then(async () => {
            if (profile.profilePicURL) {
              const storageRef = firebase.storage().ref();
              const profilePicRef = storageRef.child(
                `profilePics/${profile.userId}`
              );
              await profilePicRef
                .getDownloadURL()
                .then((url) => (profile.profilePicURL = url));
            }
          })
          .then(() => dispatch({ type: "GET_PROFILES", payload: profile }));
      }
    });
  }
};

export const clearSocialData = () => {
  return {
    type: "CLEAR_SOCIAL_DATA",
  };
};

export const clearProfiles = () => {
  return {
    type: "CLEAR_PROFILES",
  };
};
