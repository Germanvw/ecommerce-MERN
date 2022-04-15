import { useDispatch, useSelector } from "react-redux";
import { startCartAdd, startCartUpdate } from "../../redux/actions/cartActions";
import { RootState } from "../../redux/reducer/rootReducer";
import { useNavigate } from "react-router-dom";

export const AddCartButton = ({ product }: any) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleAddCart = async (amount: number) => {
    if (!isAuth) return navigate("/login");
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

  return (
    <button onClick={() => handleAddCart(1)}>
      <i className="fa-solid fa-bag-shopping"></i>
    </button>
  );
};
