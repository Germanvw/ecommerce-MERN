import { types } from "../types";
import { fetchNoToken, fetchToken } from "../../hooks/useFetch";
import { fireModal } from "../../hooks/useModal";
import {
  uiClearError,
  uiCloseModal,
  uiEndLoad,
  uiSetError,
  uiStartLoad,
} from "./uiActions";

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
      dispatch(uiStartLoad());
      const req = await fetchNoToken("auth/login", form, "POST");
      const answ = await req.json();

      if (answ.status) {
        // Token localStorage
        localStorage.setItem("x-token", answ.token);

        const user: UserObject = answ.user;
        // Dispatch
        dispatch(authLogin({ user }));
      } else {
        // Remove token localStorage
        localStorage.removeItem("x-token");
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startAuthRegister = (form: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchNoToken("auth/register", form, "POST");
      const answ = await req.json();
      if (answ.status) {
        fireModal("Success", answ.msg, "success", dispatch);
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startAuthChangePassword = ({
  password,
  newPassword,
}: {
  password: string;
  newPassword: string;
}) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken(
        "users/password",
        { password, newPassword },
        "PUT"
      );
      const answ = await req.json();
      if (answ.status) {
        dispatch(uiCloseModal());
        fireModal("Success", answ.msg, "success", dispatch);
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startAuthUserUpdate = (form: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken("users", form, "PUT");
      const answ = await req.json();
      if (answ.status) {
        dispatch(uiCloseModal());
        // updatear el token
        dispatch(userRefreshToken(answ.user._id));
        fireModal("Success", answ.msg, "success", dispatch);
      } else {
        dispatch(uiSetError(answ.msg));
        dispatch(uiClearError());
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

const userRefreshToken = (uid: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken(`users/refresh/${uid}`, {});
      const answ = await req.json();
      if (answ.status) {
        // Token localStorage
        localStorage.setItem("x-token", answ.token);
        const user: UserObject = answ.user;
        // Dispatch
        dispatch(authLogin({ user }));
      } else {
        // Remove token localStorage
        localStorage.removeItem("x-token");
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
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
      dispatch(authLogin({ user }));
    } else {
      localStorage.removeItem("x-token");
      dispatch(authEndCheck());
    }
    dispatch(uiEndLoad());
  };
};

export const startAuthLogout = () => {
  return async (dispatch: any) => {
    localStorage.removeItem("x-token");
    dispatch(authLogout());
  };
};

const authUserUpdate = (user: any) => ({
  type: types.authUserUpdate,
  payload: user,
});

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
