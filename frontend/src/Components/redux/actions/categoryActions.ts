import { types } from "../types";
import { fetchToken } from "../../hooks/useFetch";
import { uiCloseModal, uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";

interface categoryProps {
  _id: string;
  name: string;
  description: string;
  image: string;
}

export const startCatUpdate = (category: any) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken(
        `categories/${category._id}`,
        category,
        "PUT"
      );
      const answ = await req.json();

      dispatch(uiEndLoad());
      if (answ.status) {
        dispatch(catUpdate(category));
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiCloseModal());
    } catch (err) {
      console.log(err);
    }
  };
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
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startCatRemove = (_id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(uiStartLoad());
      const req = await fetchToken(`categories/${_id}`, {}, "DELETE");
      const answ = await req.json();

      if (answ.status) {
        dispatch(catRemove(_id));
      } else {
        dispatch(uiSetError(answ.msg));
      }
      dispatch(uiEndLoad());
    } catch (err) {
      console.log(err);
    }
  };
};

export const startCatFetchAll = () => {
  return async (dispatch: any) => {
    try {
      const req = await fetchToken("categories", {});
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
