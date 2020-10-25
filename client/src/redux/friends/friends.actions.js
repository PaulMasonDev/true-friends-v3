import FriendsActionTypes from "./friends.types";
import axios from "axios";

export const setFriend = (friend) => ({
  type: FriendsActionTypes.SET_FRIEND,
  payload: friend,
});

export const loadFriends = (userId) => (dispatch) => {
  axios
    .get(`/friends/pulldata/${userId}`)
    .then((res) => {
      dispatch({
        type: FriendsActionTypes.LOAD_FRIENDS,
        payload: res.data,
      });
      console.log(res.data);
    })
    .catch((err) => console.log(err));
};
