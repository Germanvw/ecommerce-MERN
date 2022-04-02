// ALL
import { Homepage } from "../Pages/Homepage";
import { Products } from "../Pages/Products";
//No Auth
import { Login } from "../Pages/auth/Login";
import { Register } from "../Pages/auth/Register";
//Admin
import { Categories as AdminCategories } from "../Pages/admin/Categories";
import { Products as AdminProducts } from "../Pages/admin/Products";
//User
import { User } from "../Pages/Private/User";
import { Cart } from "../Pages/Private/Cart";

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
  {
    name: "Products",
    path: "/products",
    Component: Products,
  },
];

export const authRoutes: Route[] = [
  {
    name: "User",
    path: "/user",
    Component: User,
  },
  {
    name: "Cart",
    path: "/cart",
    Component: Cart,
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
    Component: AdminCategories,
  },
  {
    name: "Products",
    path: "admin/products",
    Component: AdminProducts,
  },
];
