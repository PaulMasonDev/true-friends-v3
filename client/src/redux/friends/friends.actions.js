import FriendsActionTypes from './friends.types';

export const setFriend = friend => ({
  type: FriendsActionTypes.SET_FRIEND,
  payload: friend
});
