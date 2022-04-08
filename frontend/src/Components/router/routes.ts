// ALL
import { Homepage } from "../Pages/Homepage";
import { Products } from "../Pages/Products";
//No Auth
import { Login } from "../Pages/auth/Login";
import { Register } from "../Pages/auth/Register";
//Admin
import { Categories as AdminCategories } from "../Pages/admin/Categories";
import { Products as AdminProducts } from "../Pages/admin/Products";
import { Orders as AdminOrders } from "../Pages/admin/Orders";
import { Brands as AdminBrands } from "../Pages/admin/Brands";
import { Users as AdminUsers } from "../Pages/admin/Users";
//User
import { User } from "../Pages/Private/User";
import { Cart } from "../Pages/Private/Cart";
import { Checkout } from "../Pages/Private/Checkout";
import { Product } from "../Pages/Product";

interface Route {
  path: string;
  name: string;
  url?: string;
  icon?: string;
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
  {
    name: "Product",
    path: "/products/:id",
    Component: Product,
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
  {
    name: "Checkout",
    path: "/checkout/:id",
    Component: Checkout,
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
    url: "/admin/categories",
    Component: AdminCategories,
    icon: "fa-solid fa-bars",
  },
  {
    name: "Products",
    path: "admin/products",
    url: "/admin/products",
    Component: AdminProducts,
    icon: "fa-solid fa-bars",
  },
  {
    name: "Orders",
    path: "admin/orders",
    url: "/admin/orders",
    Component: AdminOrders,
    icon: "fa-solid fa-bag-shopping",
  },
  {
    name: "Brands",
    path: "admin/brands",
    url: "/admin/brands",
    Component: AdminBrands,
    icon: "fa-solid fa-copyright",
  },
  {
    name: "Users",
    path: "admin/users",
    url: "/admin/users",
    Component: AdminUsers,
    icon: "fa-solid fa-user",
  },
];
