import { ProductsOrder } from "../Models/Orders";

export const cartTotal = (cart: ProductsOrder[]) => {
  let total = 0;
  cart.map((product) => {
    total += product.price * product.quantity;
  });
  return total;
};
