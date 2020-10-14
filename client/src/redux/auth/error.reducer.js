import AuthActionTypes from './auth.types';

const initialState = {};
export default function(state = initialState, action) {
  switch (action.type) {
    case AuthActionTypes.GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}