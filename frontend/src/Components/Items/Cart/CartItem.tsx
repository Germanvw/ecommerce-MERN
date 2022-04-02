import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNoToken } from "../../hooks/useFetch";
import { startCartUpdate } from "../../redux/actions/cartActions";

import "./index.scss";
import { useEffect, useState } from "react";
export const CartItem = ({ product }: any) => {
  const dispatch = useDispatch();
  const { _id, name, price, quantity } = product;

  const [stock, setStock] = useState(0);

  const handleStock = async () => {
    const req = await fetchNoToken(`products/${_id}`, {});
    const answ = await req.json();
    if (answ.status) {
      return answ.product.inStock;
    }
  };
  console.log("stock: ", stock);
  console.log("quantity: ", quantity);
  const handleQuantity = (q: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + q, stock));
    product.quantity = newQuantity;
    dispatch(startCartUpdate(product));
  };

  useEffect(() => {
    handleStock().then((amount: number) => {
      setStock(amount);
    });
  }, [product]);
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
              className={`${(quantity === 1 || stock === 0) && "disabled"}`}
            >
              -
            </button>
            <p>{product.quantity}</p>
            <button
              onClick={() => handleQuantity(1)}
              className={`${(quantity === stock || stock === 0) && "disabled"}`}
            >
              +
            </button>
          </div>
          <div className="in-stock">
            <p>In Stock: {stock}</p>
          </div>
        </div>
        <div className="price">$ {price}</div>
      </div>
    </div>
  );
};
