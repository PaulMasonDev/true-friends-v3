import FriendsActionTypes from './friends.types';


const initialState = {
  name: '',
  friends: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FriendsActionTypes.SET_FRIEND:
      return {
        ...state,
        name: action.payload
      };
    case FriendsActionTypes.LOAD_FRIENDS:
      return {
        ...state,
        friends: action.payload
      }
    default:
      return state;
  }
}