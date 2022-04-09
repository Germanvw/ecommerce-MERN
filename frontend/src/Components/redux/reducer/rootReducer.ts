import { combineReducers } from "redux";
import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { categoryReducer } from "./categoryReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { orderReducer } from "./orderReducer";
import { brandReducer } from "./brandReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  cat: categoryReducer,
  prod: productReducer,
  cart: cartReducer,
  order: orderReducer,
  brand: brandReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
