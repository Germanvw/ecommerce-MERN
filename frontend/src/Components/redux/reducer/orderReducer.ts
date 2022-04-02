import { types } from "../types";

interface PaymentMethods {
  string: "cash" | "creditCard" | "paypal" | "bitcoin";
}

interface Status {
  string: "pending" | "paid" | "cancelled";
}

export interface ProductsOrder {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface orderProps {
  uid: string;
  paymentMethod: PaymentMethods;
  cart: ProductsOrder[] | [];
  total: number;
  delivered: boolean;
  status: Status;
}

interface stateProps {
  orderList: orderProps[];
}

const initialState: stateProps = {
  orderList: [],
};

export const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.orderAdd:
      return {
        orderList: [...state.orderList, action.payload],
      };
    case types.orderUpdate:
      return {
        orderList: state.orderList.map((order: any) =>
          order._id === action.payload._id ? action.payload : order
        ),
      };
    case types.orderRemove:
      return {
        orderList: state.orderList.filter(
          (order: any) => order._id !== action.payload
        ),
      };
    case types.orderFetchAll:
      return {
        orderList: action.payload,
      };

    default:
      return state;
  }
};
