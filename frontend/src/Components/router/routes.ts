import { Homepage } from "../Pages/Homepage";
import { User } from "../Pages/Private/User";
//No Auth
import { Login } from "../Pages/auth/Login";
import { Register } from "../Pages/auth/Register";
//Admin
import { Categories } from "../Pages/admin/Categories";
import { Products } from "../Pages/admin/Products";

interface Route {
  path: string;
  name: string;
  Component: () => JSX.Element;
}

export interface uidProps {
  isAuth?: boolean;
  isAdmin?: boolean;
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

export const adminRoutes: Route[] = [
  {
    name: "Categories",
    path: "admin/categories",
    Component: Categories,
  },
  {
    name: "Products",
    path: "admin/products",
    Component: Products,
  },
];
