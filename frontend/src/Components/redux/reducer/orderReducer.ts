import { types } from "../types";

interface PaymentMethods {
  string: "Cash" | "Credit Card" | "Paypal" | "Bitcoin";
}

interface Status {
  string: "Pending" | "Paid" | "Cancelled";
}

export interface ProductsOrder {
  _id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface orderProps {
  uid: string;
  paymentMethod: PaymentMethods;
  cart: ProductsOrder[] | [];
  total: number;
  delivered: boolean;
  status: Status;
}

interface stateProps {
  orderList: orderProps[];
  active: orderProps | null;
}

const initialState: stateProps = {
  orderList: [],
  active: null,
};

export const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.orderAdd:
      return {
        ...state,
        orderList: [...state.orderList, action.payload],
      };
    case types.orderUpdate:
      return {
        ...state,
        orderList: state.orderList.map((order: any) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };
    case types.orderRemove:
      return {
        ...state,
        orderList: state.orderList.filter(
          (order: any) => order._id !== action.payload
        ),
      };
    case types.orderFetchAll:
      return {
        ...state,
        orderList: action.payload,
      };
    case types.orderSetActive:
      return {
        ...state,
        active: action.payload,
      };
    case types.orderClearActive:
      return {
        ...state,
        active: null,
      };

    default:
      return state;
  }
};
