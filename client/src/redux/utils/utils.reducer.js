import UtilsActionTypes from "./utils.types";

const initialState = {
  splashDone: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UtilsActionTypes.ENTER_SITE:
      return {
        ...state,
        splashDone: !state.splashDone,
      };
    default:
      return state;
  }
}
