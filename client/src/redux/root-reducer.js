import { combineReducers } from "redux";
import authReducer from './auth/auth.reducer';
import errorReducer from './auth/error.reducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer
});