import { combineReducers } from "redux";
import authReducer from "./auth/auth.reducer";
import errorReducer from "./auth/error.reducer";
import friendReducer from "./friends/friends.reducer";
import utilsReducer from "./utils/utils.reducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  friends: friendReducer,
  utils: utilsReducer,
});
