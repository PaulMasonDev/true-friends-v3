import HolidaysActionTypes from "./holidays.types";

const initialState = {
  friendId: "",
  friendName: "",
  holidayName: "",
  holidays: [
    // {
    //   holiday: "birthday",
    //   date: "10/26/1981",
    //   items: ["xbox", "lawnmower", "television"],
    // },
    // {
    //   holiday: "anniversary",
    //   date: "07/15/2018",
    //   items: ["watch", "cruise", "vacation"],
    // },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HolidaysActionTypes.LOAD_HOLIDAYS:
      return {
        ...state,
        holidays: action.payload,
      };
    case HolidaysActionTypes.SET_FRIEND:
      return {
        ...state,
        friendId: action.payload.friendId,
        friendName: action.payload.friendName,
      };
    default:
      return state;
  }
}
