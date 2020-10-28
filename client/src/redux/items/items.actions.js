import ItemsActionTypes from "./items.types";
import axios from "axios";

export const loadItems = (holidayId) => (dispatch) => {
  axios
    .get(`/items/pulldata/${holidayId}`)
    .then((res) => {
      dispatch({
        type: ItemsActionTypes.LOAD_ITEMS,
        payload: res.data,
      });
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const setHolidayId = (holidayId, holidayName) => ({
  type: ItemsActionTypes.SET_HOLIDAY_INFO,
  payload: { holidayId, holidayName },
});

export const setItem = (item) => ({
  type: ItemsActionTypes.SET_ITEM,
  payload: item,
});

export const setItemId = (itemId, itemName) => ({
  type: ItemsActionTypes.SET_ITEM_ID,
  payload: { itemId, itemName },
});
