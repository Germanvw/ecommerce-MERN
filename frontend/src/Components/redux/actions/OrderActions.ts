import { types } from "../types";
import { fetchToken } from "../../hooks/useFetch";
import { uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";
import { cartClear } from "./cartActions";
import { fireModal } from "../../hooks/useModal";

export const startOrderUpdate = (order: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken(`orders/${order._id}`, order, "PUT");
      const answ = await req.json();

      if (answ.status) {
        dispatch(orderUpdate(order));
        fireModal("Success", answ.msg, "success", dispatch);
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startOrderAdd = (order: any) => {
  return async (dispatch: any) => {
    try {
      order.forEach((product: any) => {
        product.review = false;
      });

      dispatch(uiStartLoad());
      const req = await fetchToken("orders", order, "post");
      const answ = await req.json();

      if (answ.status) {
        dispatch(orderAdd(answ.order));
        dispatch(cartClear());
        fireModal("Success", answ.msg, "success", dispatch);
      } else {
        dispatch(uiSetError(answ.msg));
      }

      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startOrderFetchAll = () => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken("orders", {});
      const answ = await req.json();
      if (answ.status) {
        dispatch(orderFetchAll(answ.orders));
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startOrderAdmin = () => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken("orders/admin", {});
      const answ = await req.json();
      if (answ.status) {
        dispatch(orderFetchAll(answ.orders));
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startOrderCancel = (_id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken(
        `orders/cancel/${_id}`,
        { status: "Cancelled" },
        "PUT"
      );
      const answ = await req.json();
      if (answ.status) {
        dispatch(orderUpdate(answ.order));
        fireModal("Cancelled", answ.msg, "success", dispatch);
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const orderSetActive = (order: {}) => ({
  type: types.orderSetActive,
  payload: order,
});

export const orderClearActive = () => ({
  type: types.orderClearActive,
});

export const orderClean = () => ({
  type: types.orderClean,
});

const orderAdd = (order: {}) => ({
  type: types.orderAdd,
  payload: order,
});

const orderUpdate = (order: {}) => ({
  type: types.orderUpdate,
  payload: order,
});

const orderFetchAll = (orders: {}[]) => ({
  type: types.orderFetchAll,
  payload: orders,
});
