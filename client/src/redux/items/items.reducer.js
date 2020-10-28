import ItemsActionTypes from "./items.types";

const initialState = {
  holidayId: "",
  holidayName: "",
  holidayDate: String,
  itemName: "",
  items: [{ name: "Television" }, { name: "Bracelet" }],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ItemsActionTypes.LOAD_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case ItemsActionTypes.SET_HOLIDAY_INFO:
      return {
        ...state,
        holidayId: action.payload.holidayId,
        holidayName: action.payload.holidayName,
      };
    case ItemsActionTypes.SET_ITEM:
      return {
        ...state,
        itemName: action.payload,
      };
    default:
      return state;
  }
}
