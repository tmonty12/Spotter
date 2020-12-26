export default (state = null, action) => {
  switch (action.type) {
    case "GET_FOLLOWER_REQUESTS":
      return action.payload;
    case "SIGN_OUT":
      return null;
    default:
      return state;
  }
};
