import { types } from "../types";
import { uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";
import { fetchToken } from "../../hooks/useFetch";

export const startProdFetchAll = () => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());

      const req = await fetchToken("products", {});
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

export const prodSetActive = (product: {}) => ({
  type: types.prodSetActive,
  payload: product,
});

export const prodClearActive = () => ({
  type: types.prodClearActive,
});

const prodFetchAll = (products: {}[]) => ({
  type: types.prodFetchAll,
  payload: products,
});
