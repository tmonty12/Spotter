import firebase from "../firebase";

export const getProfilePosts = (profileId) => async (dispatch, getState) => {
    let data = [];
    const arePostsFetched = getState().posts.filter(
      (post) => post.userId === profileId
    ).length !== 0;

    if (!arePostsFetched) {
      await firebase
        .firestore()
        .collection("posts")
        .where("userId", "==", profileId)
        .get()
        .then((querySnapshot) =>
          querySnapshot.forEach((doc) => {
            const isPostFetched = getState().posts.filter(
              (post) => post.postId === doc.data().postId
            ).length !== 0;
            if (!isPostFetched) data.push(doc.data());
          })
        )
        .then(() => {
          dispatch({ type: "GET_PROFILE_POSTS", payload: data });
        });
    }
};

export const getPostContentURL = (postId) => (dispatch) => {
  const storageRef = firebase.storage().ref();
  const postContentRef = storageRef.child(`posts/${postId}`);
  postContentRef
    .getDownloadURL()
    .then((url) =>
      dispatch({ type: "GET_POST_CONTENT_URL", payload: { url, postId } })
    );
};

export const getPostFeedLikes = (postId) => (dispatch) => {
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .collection("likes")
    .doc("users")
    .get()
    .then((doc) =>
      dispatch({
        type: "GET_POST_FEED_LIKES",
        payload: { likes: doc.data().likes, postId },
      })
    )
    .catch(() =>
      dispatch({ type: "GET_POST_FEED_LIKES", payload: { likes: [], postId } })
    );
};

export const getPostFeedComments = (postId) => (dispatch) => {
  let comments = [];
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .get()
    .then((response) => {
      response.docs.forEach((doc) => {
        comments.push(doc.data());
      });
    })
    .then(() =>
      dispatch({
        type: "GET_POST_FEED_COMMENTS",
        payload: { comments, postId },
      })
    );
};

export const updatePost = (formValues) => (dispatch) => {
  const { content, ...rest } = formValues;
  const db = firebase.firestore();
  const updatePostRef = db.collection("posts").doc(rest.postId);
  updatePostRef
    .set({
      ...rest,
    })
    .then(() => {
      if (content) {
        const file = content[0];
        const storageRef = firebase.storage().ref();
        const postContentRef = storageRef.child(`posts/${rest.postId}`);
        postContentRef.put(file).then(() => {
          postContentRef.getDownloadURL().then((url) => {
            dispatch({
              type: "UPDATE_POST_CONTENT_URL",
              payload: { url, postId: rest.postId },
            });
          });
        });
      } else {
        dispatch({ type: "UPDATE_POST", payload: rest });
      }
    });
};

export const createPost = (formValues, userId) => async (
  dispatch,
  getState
) => {
  const date = new Date();
  const { content, ...rest } = formValues;
  const db = firebase.firestore();
  const newPostRef = db.collection("posts").doc(date.getTime().toString());
  const data = {
    ...rest,
    userId: userId,
    timestamp: date.getTime(),
    postId: newPostRef.id,
  };

  await newPostRef.set(data).then(async () => {
    const file = content[0];
    const storageRef = firebase.storage().ref();
    const postContentRef = storageRef.child(`posts/${newPostRef.id}`);
    
    await postContentRef.put(file).then(() => {
      const isPostFetched = getState().posts.filter(
        (post) => post.postId === data.postId
      );
      if (isPostFetched.length === 0) {
        dispatch({ type: "CREATE_POST", payload: data });
        postContentRef.getDownloadURL().then((url) =>
          dispatch({
            type: "GET_POST_CONTENT_URL",
            payload: { url, postId: newPostRef.id },
          })
        );
      }
    });
  });
};

export const deletePost = (postId) => (dispatch) => {
  const db = firebase.firestore();
  const deletePostRef = db.collection("posts").doc(postId);
  deletePostRef.delete().then(() => {
    const storageRef = firebase.storage().ref();
    const postContentRef = storageRef.child(`posts/${postId}`);
    postContentRef
      .delete()
      .then(() => dispatch({ type: "DELETE_POST", payload: postId }));
  });
};

export const clearPosts = () => {
  return {
    type: "CLEAR_POSTS",
  };
};
