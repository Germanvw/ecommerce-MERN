import { AnyAction } from "redux";
import { types } from "../types";

export interface CartProductProps {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  inStock: number;
}

interface cartProps {
  cart: CartProductProps[];
  checking: boolean;
}

const initialState: cartProps = {
  cart: [],
  checking: true,
};

export const cartReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.cartAdd:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };
    case types.cartRemove:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };
    case types.cartUpdate:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload._id ? action.payload : item
        ),
      };
    case types.cartFetchAll:
      return {
        ...state,
        cart: action.payload,
      };
    case types.cartEndCheck:
      return {
        ...state,
        checking: false,
      };
    default:
      return state;
  }
};
