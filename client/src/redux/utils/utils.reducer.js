import { refreshState } from "./utils.actions";
import UtilsActionTypes from "./utils.types";

const initialState = {
  refreshState: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
