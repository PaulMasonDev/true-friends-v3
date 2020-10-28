import HolidaysActionTypes from "./holidays.types";
import axios from "axios";
import holidaysReducer from "./holidays.reducer";

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
  type: HolidaysActionTypes.SET_FRIEND_INFO,
  payload: { friendId, friendName },
});

export const setHoliday = (holiday) => ({
  type: HolidaysActionTypes.SET_HOLIDAY,
  payload: holiday,
});

export const setDate = (date) => ({
  type: HolidaysActionTypes.SET_DATE,
  payload: date,
});
