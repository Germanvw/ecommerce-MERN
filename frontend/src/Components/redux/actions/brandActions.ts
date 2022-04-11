import { fetchNoToken, fetchToken } from "../../hooks/useFetch";
import { uiCloseModal, uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";
import { types } from "../types";
import { fireModal } from "../../hooks/useModal";
import { ThunkDispatch } from "redux-thunk/es/types";
import { AnyAction } from "redux";
import { IBrand } from "../reducer/brandReducer";

export const startBrandFetchAll = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
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
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
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

export const startChangeStatusBrand = (_id: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(uiStartLoad());

      const req = await fetchToken(`brands/active/${_id}`, {}, "PUT");
      const answ = await req.json();
      if (answ.status) {
        dispatch(brandUpdate(answ.brand));
        fireModal("Changed status", answ.msg, "success", dispatch);
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
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
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

export const brandSetActive = (brand: IBrand) => ({
  type: types.brandSetActive,
  payload: brand,
});

export const brandClearActive = () => ({
  type: types.brandClearActive,
});

const brandAdd = (brand: IBrand) => ({
  type: types.brandAdd,
  payload: brand,
});

const brandUpdate = (brand: IBrand) => ({
  type: types.brandUpdate,
  payload: brand,
});

const brandFetchAll = (brands: IBrand[]) => ({
  type: types.brandFetchAll,
  payload: brands,
});
