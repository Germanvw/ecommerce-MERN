import { types } from "../types";
import { CartProductProps } from "../reducer/cartReducer";

export const startCartAdd = (product: CartProductProps) => {
  return async (dispatch: any) => {
    try {
      const newProduct: CartProductProps = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity ? product.quantity : 1,
        inStock: product.inStock,
      };
      dispatch(cartAdd(newProduct));
    } catch (err) {
      console.log(err);
    }
  };
};

export const startCartUpdate = (product: CartProductProps) => {
  return async (dispatch: any) => {
    try {
      const updatedProduct: CartProductProps = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity: product.quantity ? product.quantity : 1,
        inStock: product.inStock,
      };
      dispatch(cartUpdate(updatedProduct));
    } catch (err) {
      console.log(err);
    }
  };
};

export const startCartRemove = (_id: string) => {
  return async (dispatch: any) => {
    try {
      dispatch(cartRemove(_id));
    } catch (err) {
      console.log(err);
    }
  };
};

export const startCartFetchAll = () => {
  return async (dispatch: any) => {
    try {
      const cart = localStorage.getItem("cart");

      if (!cart) {
        dispatch(cartFetchAll([]));
      } else {
        dispatch(cartFetchAll(JSON.parse(cart)));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const cartClear = () => ({
  type: types.cartClear,
});

const cartAdd = (product: CartProductProps) => ({
  type: types.cartAdd,
  payload: product,
});

const cartRemove = (_id: string) => ({
  type: types.cartRemove,
  payload: _id,
});

const cartUpdate = (product: CartProductProps) => ({
  type: types.cartUpdate,
  payload: product,
});

const cartFetchAll = (cart: CartProductProps[]) => ({
  type: types.cartFetchAll,
  payload: cart,
});
