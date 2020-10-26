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

export const deleteFriend = (userId, friendId, name) => (dispatch) => {
  if (
    window.confirm(
      `Are you sure you want to delete ${name} from your list? You will lose all data associated with this person.`
    )
  ) {
    axios
      .delete(`/friends/deletefriend/${userId}/${friendId}`)
      .then((res) => {
        alert(`${name.trim()} has been deleted.`);
      })
      .then((res) => {
        axios
          .get(`/friends/pulldata/${userId}`)
          .then((res) => {
            dispatch({
              type: FriendsActionTypes.LOAD_FRIENDS,
              payload: res.data,
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  } else {
    window.alert(`${name} was not deleted.  You are a TRUE FRIEND indeed!`);
  }
};
