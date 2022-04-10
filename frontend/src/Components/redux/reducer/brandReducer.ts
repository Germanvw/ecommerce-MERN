import { types } from "../types";

export interface brandProps {
  _id?: string;
  name: string;
  image: string;
  active: boolean;
}

interface stateProps {
  brandList: brandProps[];
  active: brandProps | null;
}

const initialState: stateProps = {
  brandList: [],
  active: null,
};

export const brandReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case types.brandAdd:
      return {
        brandList: [...state.brandList, action.payload],
      };
    case types.brandUpdate:
      return {
        brandList: state.brandList.map((brand: any) =>
          brand._id === action.payload._id ? action.payload : brand
        ),
        active: null,
      };
    case types.brandSetActive:
      return {
        ...state,
        active: action.payload,
      };

    case types.brandClearActive:
      return {
        ...state,
        active: null,
      };
    case types.brandFetchAll:
      return {
        ...state,
        brandList: action.payload,
      };

    default:
      return state;
  }
};
