import { types } from "../types";
import { uiCloseModal, uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";
import { fetchNoToken, fetchToken } from "../../hooks/useFetch";
import { fireModal } from "../../hooks/useModal";
import { ThunkDispatch } from "redux-thunk/es/types";
import { AnyAction } from "redux";
import { IProductCart, startOrderUpdate } from "./OrderActions";

export const startProdFetchAll = (cat?: string, brand?: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(uiStartLoad());

      const req = await fetchNoToken(`products?cat=${cat}&brand=${brand}`, {});

      const answ = await req.json();
      if (answ.status) {
        dispatch(prodFetchAll(answ.products));
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startProdAdd = (product: any) => {
  const { category } = product;
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(uiStartLoad());

      //get Category
      let reqCat;
      let answCat;

      if (!category._id) {
        reqCat = await fetchToken(`categories/${category}`, {});
        answCat = await reqCat.json();
      } else {
        reqCat = await fetchToken(`categories/${category._id}`, {});
        answCat = await reqCat.json();
      }

      if (answCat.status) {
        product.category = answCat.category;

        const req = await fetchToken("products", product, "POST");
        const answ = await req.json();

        if (answ.status) {
          dispatch(prodAdd(answ.product));
          dispatch(uiCloseModal());
          fireModal("Success", answ.msg, "success", dispatch);
        } else {
          dispatch(uiSetError(answ.msg));
        }
      } else {
        dispatch(uiSetError(answCat.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startProdUpdate = (product: any) => {
  const { _id, category } = product;
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(uiStartLoad());
      //get Category

      let reqCat;
      let answCat;

      if (!category._id) {
        reqCat = await fetchToken(`categories/${category}`, {});
        answCat = await reqCat.json();
      } else {
        reqCat = await fetchToken(`categories/${category._id}`, {});
        answCat = await reqCat.json();
      }

      if (answCat.status) {
        product.category = answCat.category;
        const req = await fetchToken(`products/${_id}`, product, "PUT");
        const answ = await req.json();
        if (answ.status) {
          dispatch(prodUpdate(answ.product));
          dispatch(uiCloseModal());
          fireModal("Success", answ.msg, "success", dispatch);
        } else {
          dispatch(uiSetError(answ.msg));
        }
      } else {
        dispatch(uiSetError(answCat.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startProdRemove = (_id: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(uiStartLoad());

      const req = await fetchToken(`products/${_id}`, {}, "delete");
      const answ = await req.json();

      if (answ.status) {
        dispatch(prodRemove(_id));
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

export const startReviewProduct = (
  cartItem: IProductCart,
  stars: number,
  comment: string,
  oid: string
) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    console.log(oid);
    try {
      const req = await fetchToken(
        `review/${cartItem._id}`,
        { stars, comment, oid },
        "POST"
      );

      const answ = await req.json();
      if (answ.status) {
        dispatch(uiCloseModal());
        dispatch(startOrderUpdate(answ.order));
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

export const prodSetActive = (product: {}) => ({
  type: types.prodSetActive,
  payload: product,
});

export const prodClearActive = () => ({
  type: types.prodClearActive,
});

const prodAdd = (product: {}) => ({
  type: types.prodAdd,
  payload: product,
});

const prodUpdate = (product: {}) => {
  return { type: types.prodUpdate, payload: product };
};

const prodRemove = (_id: string) => ({
  type: types.prodRemove,
  payload: _id,
});

const prodFetchAll = (products: {}[]) => ({
  type: types.prodFetchAll,
  payload: products,
});
