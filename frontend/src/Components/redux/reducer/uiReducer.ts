import { AnyAction } from "redux";
import { types } from "../types";

interface uiProps {
  loading: boolean;
  darkMode: boolean;
  errorMsg: string | null;
}

const initialState = {
  loading: false,
  darkMode: true,
  errorMsg: null,
};

export const uiReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.uiSetError:
      return {
        ...state,
        errorMsg: action.payload,
      };
    case types.uiClearError:
      return {
        ...state,
        errorMsg: null,
      };
    case types.uiSwapTheme:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};
