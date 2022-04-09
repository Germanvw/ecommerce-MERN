import { fetchNoToken, fetchToken } from "../../hooks/useFetch";
import { uiCloseModal, uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";

import { types } from "../types";
import { brandProps } from "../reducer/brandReducer";
import { fireModal } from "../../hooks/useModal";

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

export const startBrandAdd = (brand: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());

      const req = await fetchToken("brands", brand, "post");
      const answ = await req.json();

      if (answ.status) {
        dispatch(brandAdd(answ.brand));
        dispatch(uiCloseModal());
        fireModal("Created", answ.msg, "success", dispatch);
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startBrandDelete = (_id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());

      const req = await fetchToken(`brands/${_id}`, {}, "DELETE");
      const answ = await req.json();

      if (answ.status) {
        dispatch(brandRemove(_id));
        fireModal("Removed", answ.msg, "success", dispatch);
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startBrandUpdate = (brand: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken(`brands/${brand._id}`, brand, "PUT");
      const answ = await req.json();

      dispatch(uiEndLoad());
      if (answ.status) {
        dispatch(brandUpdate(brand));
        dispatch(uiCloseModal());
        fireModal("Updated", answ.msg, "success", dispatch);
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiCloseModal());
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
