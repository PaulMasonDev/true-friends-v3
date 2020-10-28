import HolidaysActionTypes from "./holidays.types";

const initialState = {
  friendId: "",
  friendName: "",
  holidayName: "",
  holidayDate: String,
  holidays: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HolidaysActionTypes.LOAD_HOLIDAYS:
      return {
        ...state,
        holidays: action.payload,
      };
    case HolidaysActionTypes.SET_FRIEND_INFO:
      return {
        ...state,
        friendId: action.payload.friendId,
        friendName: action.payload.friendName,
      };
    case HolidaysActionTypes.SET_HOLIDAY:
      return {
        ...state,
        holidayName: action.payload,
      };
    case HolidaysActionTypes.SET_DATE:
      return {
        ...state,
        holidayDate: action.payload,
      };
    default:
      return state;
  }
}
