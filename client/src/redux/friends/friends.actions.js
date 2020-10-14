import FriendsActionTypes from './friends.types';

export const setFriend = friend => ({
  type: FriendsActionTypes.SET_FRIEND,
  payload: friend
});

export const loadFriends = friends => ({
  type: FriendsActionTypes.LOAD_FRIENDS,
  payload: friends
});
