import Swal from "sweetalert2";
import { fetchNoToken, fetchToken } from "../../hooks/useFetch";
import { types } from "../types";

interface UserObject {
  uid: string;
  username: string;
  email: string;
  gender: string;
  picture: string;
  isAdmin: boolean;
}
const data = {
  email: "email1@mail.com",
  password: "asdasd",
};

export const startAuthLogin = ({ form }: any) => {
  return async (dispatch: any) => {
    try {
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
        Swal.fire("Error", answ.msg, "error");
      }
    } catch (err) {
      console.log("error");
    }
  };
};

export const startAuthRegister = ({ form }: any) => {
  console.log("Reducer: ", form);
  return async (dispatch: any) => {
    try {
      const req = await fetchNoToken("auth/register", form, "POST");
      const answ = await req.json();
      if (answ.status) {
        Swal.fire("Success", answ.msg, "success");
      } else {
        Swal.fire("Error", answ.msg, "error");
      }
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
