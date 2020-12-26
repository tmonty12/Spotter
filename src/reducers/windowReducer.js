export default (state = window.innerWidth, action) => {
  if (action.type === "RESIZE_WINDOW") {
    return action.payload;
  } else {
    return state;
  }
};
