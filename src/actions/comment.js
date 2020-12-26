import firebase from "../firebase";

export const createComment = (commentType, postId, text) => (
  dispatch,
  getState
) => {
  const type =
    commentType === "post" ? "UPDATE_COMMENTS" : "UPDATE_FEED_COMMENTS";
  const date = new Date();
  const comment = {
    text,
    userId: getState().auth.userId,
    timestamp: date.getTime(),
  };
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .doc(date.getTime().toString())
    .set(comment)
    .then(() =>
      dispatch({
        type,
        payload: { comment, postId },
      })
    );
};

export const getPostComments = (postId) => async (dispatch) => {
  let comments = [];
  await firebase
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
    .then(() => dispatch({ type: "GET_POST_COMMENTS", payload: comments }));
};

export const clearPostComments = () => {
  return {
    type: "CLEAR_POST_COMMENTS",
  };
};

export const changeCommentMode = (commentType, mode, postId) => {
  const type =
    commentType === "post" ? "CHANGE_COMMENT_MODE" : "CHANGE_FEED_COMMENT_MODE";
  return {
    type,
    payload: { mode, postId },
  };
};

export const deleteComment = (deleteType, postId, commentId) => (dispatch) => {
  const type = deleteType === "post" ? "DELETE_COMMENT" : "DELETE_FEED_COMMENT";
  firebase
    .firestore()
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .doc(commentId.toString())
    .delete()
    .then(() => dispatch({ type, payload: { commentId, postId } }));
};
