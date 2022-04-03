import { useDispatch, useSelector } from "react-redux";
import { startCartAdd, startCartUpdate } from "../../redux/actions/cartActions";
import { RootState } from "../../redux/reducer/rootReducer";

export const AddCartButton = ({ product, text }: any) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const handleAddCart = async (amount: number) => {
    const productCart = await cart.find(
      (item: any) => item._id === product._id
    );

    if (productCart) {
      product.quantity = productCart.quantity + amount;
      dispatch(startCartUpdate(product));
    } else {
      dispatch(startCartAdd(product));
    }
  };

  return <button onClick={() => handleAddCart(1)}>{text}</button>;
};
