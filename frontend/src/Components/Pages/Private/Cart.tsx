import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CartItem } from "../../Items/Cart/CartItem";
import { startOrderAdd } from "../../redux/actions/OrderActions";
import { RootState } from "../../redux/reducer/rootReducer";
import { startProdFetchAll } from "../../redux/actions/productActions";

import "./index.scss";

export const Cart = () => {
  const { cart } = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const handleOrder = () => {
    if (cart.length > 0) {
      dispatch(startOrderAdd(cart));
    }
  };

  useEffect(() => {
    let total = 0;
    cart.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    if (cart.length > 0) {
      dispatch(startProdFetchAll("none", "none"));
    }
  }, []);

  return (
    <div className="cart-body">
      <div className="container">
        <div className="cart-list pt-4">
          {cart.length > 0 ? (
            cart.map((item: any) => <CartItem key={item._id} product={item} />)
          ) : (
            <p>No items in cart</p>
          )}
        </div>
        <div className="d-flex justify-content-between">
          <div></div>
          <div className="total">
            <p>Total: ${total}</p>
            <button
              onClick={handleOrder}
              className={`${total === 0 && "disabled"}`}
            >
              Complete Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
