import firebase from "../firebase";

export const getPost = (postId) => async (dispatch) => {
  await firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .get()
    .then((doc) => {
      dispatch({
        type: "GET_POST",
        payload: doc.data(),
      });
    })
    .then(() => {
      const storageRef = firebase.storage().ref();
      const postContentRef = storageRef.child(`posts/${postId}`);
      postContentRef
        .getDownloadURL()
        .then((url) => dispatch({ type: "GET_POST_DETAIL_URL", payload: url }));
    });
};

export const clearPost = () => {
  return {
    type: "CLEAR_POST",
  };
};

export const updateLike = (likeType, postId) => (dispatch, getState) => {
  let likes;
  const userId = getState().auth.userId;
  const type = likeType === "post" ? "UPDATE_LIKE" : "UPDATE_FEED_LIKE";
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .collection("likes")
    .doc("users")
    .get()
    .then((doc) => {
      if (doc.exists) {
        likes = doc.data().likes;
        const index = likes.indexOf(userId);
        if (!likes) {
          likes = [userId];
        } else if (index === -1) {
          likes.push(userId);
        } else {
          likes.splice(index, 1);
        }

        firebase
          .firestore()
          .collection("posts")
          .doc(postId)
          .collection("likes")
          .doc("users")
          .set({ likes })
          .then(() => {
            dispatch({
              type,
              payload: { likes, postId },
            });
          });
      } else {
        firebase
          .firestore()
          .collection("posts")
          .doc(postId)
          .collection("likes")
          .doc("users")
          .set({ likes: [userId] })
          .then(() => {
            dispatch({
              type,
              payload: { likes: [userId], postId },
            });
          });
      }
    });
};

export const getLikes = (postId) => (dispatch) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .collection("likes")
    .doc("users")
    .get()
    .then((doc) => dispatch({ type: "GET_LIKES", payload: doc.data().likes }))
    .catch(() => dispatch({ type: "GET_LIKES", payload: [] }));
};

export const changeCreateFormDisplay = (newState) => {
  return {
    type: "CHANGE_CREATE_FORM_DISPLAY",
    payload: newState,
  };
};
