import { AnyAction } from "redux";
import { types } from "../types";

interface modalProps {
  category: boolean;
  product: boolean;
  order: boolean;
}

interface uiProps {
  loading: boolean;
  darkMode: boolean;
  modal: modalProps;
  errorMsg: string | null;
}

const initialModal: modalProps = {
  category: false,
  product: false,
  order: false,
};

const initialState: uiProps = {
  loading: false,
  darkMode: true,
  modal: initialModal,
  errorMsg: null,
};

export const uiReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.uiStartLoad:
      return {
        ...state,
        loading: true,
      };

    case types.uiEndLoad:
      return {
        ...state,
        loading: false,
      };

    case types.uiSetError:
      return {
        ...state,
        errorMsg: action.payload,
      };

    case types.uiClearError:
      return {
        ...state,
        errorMsg: null,
      };

    case types.uiOpenModalCategory:
      return {
        ...state,
        modal: { ...state.modal, category: true },
      };

    case types.uiOpenModalProduct:
      return {
        ...state,
        modal: { ...state.modal, product: true },
      };

    case types.uiOpenModalOrder:
      return {
        ...state,
        modal: { ...state.modal, order: true },
      };

    case types.uiCloseModal:
      return {
        ...state,
        modal: initialModal,
      };

    case types.uiSwapTheme:
      return {
        ...state,
        darkMode: !state.darkMode,
      };

    default:
      return state;
  }
};