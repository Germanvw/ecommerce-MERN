import { combineReducers } from "redux";

import { uiReducer } from "./uiReducer";
import { authReducer } from "./authReducer";
import { categoryReducer } from "./categoryReducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  cat: categoryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
