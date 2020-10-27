import FriendsActionTypes from "./friends.types";
import axios from "axios";

export const loadFriends = (userId) => (dispatch) => {
  axios
    .get(`/friends/pulldata/${userId}`)
    .then((res) => {
      dispatch({
        type: FriendsActionTypes.LOAD_FRIENDS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const setFriend = (friend) => ({
  type: FriendsActionTypes.SET_FRIEND,
  payload: friend,
});
