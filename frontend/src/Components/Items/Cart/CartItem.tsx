import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startCartUpdate } from "../../redux/actions/cartActions";

import "./index.scss";
export const CartItem = ({ product }: any) => {
  const dispatch = useDispatch();

  const { _id, name, price, quantity, inStock } = product;

  const handleQuantity = (q: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + q, inStock));
    product.quantity = newQuantity;
    dispatch(startCartUpdate(product));
  };

  return (
    <div className="cart-item">
      <div className="left">
        <Link className="item-name" to={`products/${_id}`}>
          {name}
        </Link>
        <div className="free-shipping">
          <p>Free Shiping!</p>
        </div>
      </div>
      <div className="right">
        <div className="handler">
          <div className="quantity">
            <button
              onClick={() => handleQuantity(-1)}
              className={`${quantity === 0 && "disabled"}`}
            >
              -
            </button>
            <p>{product.quantity}</p>
            <button
              onClick={() => handleQuantity(1)}
              className={`${quantity === inStock && "disabled"}`}
            >
              +
            </button>
          </div>
          <div className="in-stock">
            <p>In Stock: {inStock}</p>
          </div>
        </div>
        <div className="price">$ {price}</div>
      </div>
    </div>
  );
};
