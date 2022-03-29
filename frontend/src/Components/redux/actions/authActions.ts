import { types } from "../types";
import { fetchNoToken, fetchToken } from "../../hooks/useFetch";
import { fireModal } from "../../hooks/useModal";
import { uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";

interface UserObject {
  uid: string;
  username: string;
  email: string;
  gender: string;
  picture: string;
  isAdmin: boolean;
}

export const startAuthLogin = (form: any) => {
  return async (dispatch: any) => {
    try {
      await dispatch(uiStartLoad());
      const req = await fetchNoToken("auth/login", form, "POST");
      const answ = await req.json();

      if (answ.status) {
        // Token localStorage
        localStorage.setItem("x-token", answ.token);

        const user: UserObject = answ.user;
        // Dispatch
        await dispatch(authLogin({ user }));
      } else {
        // Remove token localStorage
        localStorage.removeItem("x-token");
        await dispatch(uiSetError(answ.msg));
      }
      await dispatch(uiEndLoad());
    } catch (err) {
      console.log("error");
    }
  };
};

export const startAuthRegister = (form: any) => {
  return async (dispatch: any) => {
    try {
      await dispatch(uiStartLoad());
      const req = await fetchNoToken("auth/register", form, "POST");
      const answ = await req.json();
      if (answ.status) {
        fireModal("Success", answ.msg, "success", dispatch);
      } else {
        await dispatch(uiSetError(answ.msg));
      }
      await dispatch(uiEndLoad());
    } catch (err) {
      console.log("err");
    }
  };
};

export const startAuthCheck = () => {
  return async (dispatch: any) => {
    const req = await fetchToken("auth/refresh", {});
    const answ = await req.json();

    if (answ.status) {
      localStorage.setItem("x-token", answ.token);

      const user: UserObject = answ.user;
      await dispatch(authLogin({ user }));
    } else {
      localStorage.removeItem("x-token");
      await dispatch(authEndCheck());
    }
    await dispatch(uiEndLoad());
  };
};

export const startAuthLogout = () => {
  return async (dispatch: any) => {
    localStorage.removeItem("x-token");
    dispatch(authLogout());
  };
};

const authLogin = (user: any) => ({
  type: types.authLogin,
  payload: user,
});

const authLogout = () => ({
  type: types.authLogout,
});

const authEndCheck = () => ({
  type: types.authEndCheck,
});
