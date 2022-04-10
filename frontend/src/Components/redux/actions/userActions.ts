import { fetchToken } from "../../hooks/useFetch";
import { fireModal } from "../../hooks/useModal";
import { types } from "../types";
import { uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";

export const setUserActive = (user: any) => ({
  type: types.userSetActive,
  payload: user,
});

export const clearUserActive = () => ({
  type: types.userClearActive,
});

export const startChangeStateUser = (_id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());

      const req = await fetchToken(`users/active/${_id}`, {}, "PUT");
      const answ = await req.json();
      if (answ.status) {
        dispatch(userStateChange(answ.user));
        fireModal("Changed status", answ.msg, "success", dispatch);
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startUserFetchAll = () => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken("users/all", {});
      console.log(req);
      const answ = await req.json();
      console.log(answ);
      if (answ.status) {
        dispatch(userFetchAll(answ.users));
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

const userFetchAll = (users: any) => ({
  type: types.userFetchAll,
  payload: users,
});

const userStateChange = (user: any) => ({
  type: types.userStateChange,
  payload: user,
});
