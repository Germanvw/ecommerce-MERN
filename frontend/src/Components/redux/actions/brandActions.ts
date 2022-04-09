import { fetchNoToken } from "../../hooks/useFetch";
import { uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";

import { types } from "../types";
import { brandProps } from "../reducer/brandReducer";

export const startBrandFetchAll = () => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());

      const req = await fetchNoToken("brands", {});
      const answ = await req.json();
      if (answ.status) {
        dispatch(brandFetchAll(answ.brands));
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const brandSetActive = (brand: {}) => ({
  type: types.brandSetActive,
  payload: brand,
});

export const brandClearActive = () => ({
  type: types.brandClearActive,
});

const brandAdd = (brand: brandProps) => ({
  type: types.brandAdd,
  payload: brand,
});

const brandUpdate = (brand: brandProps) => ({
  type: types.brandUpdate,
  payload: brand,
});

const brandRemove = (_id: string) => ({
  type: types.brandRemove,
  payload: _id,
});

const brandFetchAll = (brands: brandProps[]) => ({
  type: types.brandFetchAll,
  payload: brands,
});
