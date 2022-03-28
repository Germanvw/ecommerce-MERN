import { types } from "../types";
import { fetchToken } from "../../hooks/useFetch";
import { uiEndLoad, uiSetError, uiStartLoad } from "./uiActions";

export const startCatFetchAll = () => {
  return async (dispatch: any) => {
    try {
      await dispatch(uiStartLoad());
      const req = await fetchToken("categories", {});
      const answ = await req.json();
      await dispatch(uiEndLoad());

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

const catFetchAll = (categories: []) => ({
  type: types.catFetchAll,
  payload: categories,
});
