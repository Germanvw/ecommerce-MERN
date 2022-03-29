import { types } from "../types";

interface productProps {
  name: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
  category: {};
}

interface stateProps {
  productList: productProps[];
  active: productProps | null;
}

const initialState: stateProps = {
  productList: [],
  active: null,
};

export const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.prodAdd:
      return {
        productList: [...state.productList, action.payload],
      };
    case types.prodUpdate:
      return {
        productList: state.productList.map((product: any) =>
          product._id === action.payload._id ? action.payload : product
        ),
        active: null,
      };
    case types.prodRemove:
      return {
        productList: state.productList.filter(
          (product: any) => product._id !== action.payload
        ),
        active: null,
      };
    case types.prodSetActive:
      return {
        ...state,
        active: action.payload,
      };

    case types.prodClearActive:
      return {
        ...state,
        active: null,
      };
    case types.prodFetchAll:
      return {
        ...state,
        productList: action.payload,
      };

    default:
      return state;
  }
};
