import { types } from "../types";

interface productProps {
  name: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
  category: string;
}

interface stateProps {
  products: productProps[];
}

const initialState: stateProps = {
  products: [],
};

export const productReducer = (state = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
