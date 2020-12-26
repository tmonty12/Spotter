export const resizeWindow = (width) => {
  return {
    type: "RESIZE_WINDOW",
    payload: width,
  };
};
