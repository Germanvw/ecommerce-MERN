import { types } from "../types";
import { fetchToken } from "../../hooks/useFetch";
import { uiCloseModal, uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";
import { fireModal } from "../../hooks/useModal";

interface CategoryProp {
  _id?: string;
  name: string;
  description: string;
  image: string;
  active?: boolean;
}

export const startCatUpdate = (category: any) => async (dispatch: any) => {
  try {
    dispatch(uiStartLoad());
    const req = await fetchToken(`categories/${category._id}`, category, "PUT");
    const answ = await req.json();

    dispatch(uiEndLoad());
    if (answ.status) {
      dispatch(catUpdate(category));
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

export const startCatAdd = (category: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());

      const req = await fetchToken("categories", category, "post");
      const answ = await req.json();

      if (answ.status) {
        dispatch(catAdd(answ.category));
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

export const startChangeStateCategory = (_id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken(`categories/active/${_id}`, {}, "PUT");
      const answ = await req.json();

      if (answ.status) {
        dispatch(catUpdate(answ.category));
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

export const startCatFetchAll = (active: boolean) => {
  return async (dispatch: any) => {
    try {
      const req = await fetchToken(`categories/${active && "active/"}`, {});
      const answ = await req.json();
      if (answ.status) {
        dispatch(catFetchAll(answ.categories));
      } else {
        dispatch(uiSetError(answ.msg));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const catSetActive = (category: any) => ({
  type: types.catSetActive,
  payload: category,
});

export const catClearActive = () => ({
  type: types.catClearActive,
});

const catUpdate = (category: {}) => ({
  type: types.catUpdate,
  payload: category,
});

const catAdd = (category: {}) => ({
  type: types.catAdd,
  payload: category,
});

const catRemove = (_id: string) => ({
  type: types.catRemove,
  payload: _id,
});

const catFetchAll = (categories: []) => ({
  type: types.catFetchAll,
  payload: categories,
});
