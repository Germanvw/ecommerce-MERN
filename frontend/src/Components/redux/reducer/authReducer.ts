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

const initialState: userProps = {
  checking: true,
  isAuth: false,
};

export const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
        isAuth: true,
        isAdmin: action.payload.user.isAdmin,
      };
    case types.authLogout:
      return {
        checking: false,
        isAuth: false,
      };
    case types.authEndCheck:
      return {
        ...state,
        checking: false,
      };
    default:
      return state;
  }
};
