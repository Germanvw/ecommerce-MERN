import { types } from "../types";

export const uiSetError = (error: string) => ({
  type: types.uiSetError,
  payload: error,
});

export const uiClearError = () => ({
  type: types.uiClearError,
});

export const uiOpenModalCategory = () => ({
  type: types.uiOpenModalCategory,
});

export const uiOpenModalProduct = () => ({
  type: types.uiOpenModalProduct,
});

export const uiOpenModalOrder = () => ({
  type: types.uiOpenModalOrder,
});

export const uiOpenModalUser = () => ({
  type: types.uiOpenModalUser,
});

export const uiOpenModalPassword = () => ({
  type: types.uiOpenModalPassword,
});

export const uiCloseModal = () => ({
  type: types.uiCloseModal,
});

export const uiSwapTheme = () => ({
  type: types.uiSwapTheme,
});

export const uiStartLoad = () => ({
  type: types.uiStartLoad,
});

export const uiEndLoad = () => ({
  type: types.uiEndLoad,
});
