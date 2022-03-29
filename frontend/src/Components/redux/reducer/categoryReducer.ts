import { types } from "../types";

interface categoryProps {
  _id?: string;
  name: string;
  description: string;
  image: string;
}

interface stateProps {
  categoryList: categoryProps[];
  active: categoryProps | null;
}

const initialState: stateProps = {
  categoryList: [],
  active: null,
};

export const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.catAdd:
      return {
        categoryList: [...state.categoryList, action.payload],
      };
    case types.catUpdate:
      console.log(action.payload);
      return {
        categoryList: state.categoryList.map((category: any) =>
          category._id === action.payload._id ? action.payload : category
        ),
        active: null,
      };
    case types.catRemove:
      return {
        categoryList: state.categoryList.filter(
          (category: categoryProps) => category._id !== action.payload
        ),
        active: null,
      };
    case types.catSetActive:
      return {
        ...state,
        active: action.payload,
      };

    case types.catClearActive:
      return {
        ...state,
        active: null,
      };
    case types.catFetchAll:
      return {
        ...state,
        categoryList: action.payload,
      };
    default:
      return state;
  }
};
