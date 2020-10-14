import FriendsActionTypes from './friends.types';


const initialState = {
  name: ''
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FriendsActionTypes.SET_FRIEND:
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
}