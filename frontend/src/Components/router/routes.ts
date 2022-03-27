import { Homepage } from "../Pages/Homepage";
import { User } from "../Pages/Private/User";

import { Login } from "../Pages/auth/Login";
import { Register } from "../Pages/auth/Register";

interface Route {
  path: string;
  name: string;
  Component: () => JSX.Element;
}

export interface uidProps {
  isAuth: boolean;
}

export const publicRoutes: Route[] = [
  {
    name: "Homepage",
    path: "/",
    Component: Homepage,
  },
];

export const authRoutes: Route[] = [
  {
    name: "User",
    path: "/user",
    Component: User,
  },
];

export const unAuthRoutes: Route[] = [
  {
    name: "Login",
    path: "/login",
    Component: Login,
  },
  {
    name: "Register",
    path: "/register",
    Component: Register,
  },
];
