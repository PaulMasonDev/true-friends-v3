import HolidaysActionTypes from "./holidays.types";
import axios from "axios";

export const loadHolidays = (friendId) => (dispatch) => {
  axios
    .get(`/holidays/pulldata/${friendId}`)
    .then((res) => {
      dispatch({
        type: HolidaysActionTypes.LOAD_HOLIDAYS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const setFriendId = (friendId, friendName) => ({
  type: HolidaysActionTypes.SET_FRIEND,
  payload: { friendId, friendName },
});
