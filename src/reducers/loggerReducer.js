const INITIAL_STATE = {
  date: new Date(),
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SELECT_DATE":
      return { ...state, date: action.payload };
    default:
      return state;
  }
};
