export default (state = [], action) => {
  switch (action.type) {
    case "GET_PROFILES":
      return [...state, action.payload];
    case "GET_ALL_PROFILES":
      return action.payload;
    case "UPDATE_PROFILE":
      let newState = [...state];
      return newState.map((profile) =>
        profile.userId === action.payload.userId
          ? { ...action.payload }
          : profile
      );
    case "UPDATE_PROFILE_PIC_URL":
      let newState1 = [...state];
      return newState1.map((profile) =>
        profile.userId === action.payload.userId
          ? { ...profile, profilePicURL: action.payload.url }
          : profile
      );
    case "CLEAR_PROFILES":
      return [];
    case "SIGN_OUT":
      return [];
    default:
      return state;
  }
};
