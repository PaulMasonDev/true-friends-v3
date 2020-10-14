import AuthActionTypes from './auth.types';

const isEmpty = require("is-empty");
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case AuthActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case AuthActionTypes.USER_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}