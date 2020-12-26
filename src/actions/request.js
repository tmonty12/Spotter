import firebase from "../firebase";

export const getFollowerRequests = () => async (dispatch, getState) => {
  let requests = [];
  await firebase
    .firestore()
    .collection("profiles")
    .doc(getState().auth.userId)
    .collection("social")
    .where("isFollower", "==", "requested")
    .get()
    .then((querySnapshot) =>
      querySnapshot.forEach((doc) =>
        requests.push({
          userId: doc.data().userId,
          timestamp: doc.data().timestamp,
        })
      )
    )
    .then(() => dispatch({ type: "GET_FOLLOWER_REQUESTS", payload: requests }));
};
