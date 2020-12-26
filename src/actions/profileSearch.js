import firebase from "../firebase";

export const getProfileSearch = (searchTerm) => async (dispatch) => {
  let payload = [];
  await firebase
    .firestore()
    .collection("profiles")
    .get()
    .then((response) => {
      response.docs.forEach((doc) => {
        if (doc.data().username.includes(searchTerm)) {
          payload.push(doc.data().userId);
        }
      });
    })
    .then(() => {
      if (payload.length < 1) {
        payload = null;
      }
      dispatch({
        type: "GET_PROFILE_SEARCH",
        payload,
      });
    });
};
