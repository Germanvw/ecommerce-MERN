import { types } from "../types";

export const uiSetError = (error: string) => ({
  type: types.uiSetError,
  payload: error,
});

export const uiClearError = () => ({
  type: types.uiClearError,
});

export const uiSwapTheme = () => ({
  type: types.uiSwapTheme,
});
