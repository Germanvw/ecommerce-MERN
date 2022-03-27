import { types } from "../types";

interface categoryProps {
  name: string;
  description: string;
  image: string;
}

interface stateProps {
  categories: categoryProps[];
}

const initialState: stateProps = {
  categories: [],
};

export const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.catAdd:
      return {
        categories: [...state.categories, action.payload],
      };
    case types.catRemove:
      return {
        categories: state.categories.filter(
          (category: categoryProps) => category.name !== action.payload
        ),
      };
    case types.catUpdate:
      return {
        categories: state.categories.map((category: categoryProps) => {
          category.name === action.payload.name
            ? (category = action.payload)
            : category;
        }),
      };
    case types.catFetchAll:
      return {
        categories: action.payload,
      };
    default:
      return state;
  }
};
