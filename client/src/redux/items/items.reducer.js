import ItemsActionTypes from "./items.types";

const initialState = {
  holidayId: "",
  holidayName: "",
  holidayDate: String,
  items: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
