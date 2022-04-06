import {
  startCartAdd,
  startCartRemove,
  startCartUpdate,
} from "../redux/actions/cartActions";

export const handleProductCart = async (
  product: any,
  cart: any,
  dispatch: any
) => {
  console.log(product);
  const productCart = await cart.find((item: any) => item._id === product._id);
  console.log(productCart);
  if (productCart) {
    console.log(product.quantity);
    if (product.quantity === 0) {
      dispatch(startCartRemove(product._id));
    } else {
      // product.quantity = productCart.quantity + amount;
      dispatch(startCartUpdate(product));
    }
  } else {
    dispatch(startCartAdd(product));
  }
};
