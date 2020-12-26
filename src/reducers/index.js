import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import profileReducer from "./profileReducer";
import postReducer from "./postReducer";
import socialReducer from "./socialReducer";
import postsReducer from "./postsReducer";
import requestsReducer from "./requestsReducer";
import profilesReducer from "./profilesReducer";
import profileSearchReducer from "./profileSearchReducer";
import windowReducer from "./windowReducer";
import loggerReducer from "./loggerReducer";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  profile: profileReducer,
  post: postReducer,
  posts: postsReducer,
  social: socialReducer,
  requests: requestsReducer,
  profiles: profilesReducer,
  profileSearch: profileSearchReducer,
  window: windowReducer,
  logger: loggerReducer,
});
