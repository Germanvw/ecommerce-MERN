import { AnyAction } from "redux";
import { types } from "../types";

interface userProps {
  checking: boolean;
  isAuth: boolean;
  uid?: string;
  username?: string;
  email?: string;
  gender?: string;
  photoURL?: string;
}

const initialState = {
  userList: [],
  active: null,
};

export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.userSetActive:
      return {
        ...state,
        active: action.payload,
      };
    case types.userClearActive:
      return {
        ...state,
        active: null,
      };
    case types.userFetchAll:
      return {
        ...state,
        userList: action.payload,
      };
    case types.userStateChange:
      return {
        ...state,
        userList: state.userList.map((user: any) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    default:
      return state;
  }
};
