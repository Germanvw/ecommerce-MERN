import { useEffect, useState } from "react";
import { CartItem } from "../../Items/Cart/CartItem";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";
import "./index.scss";

export const Cart = () => {
  const { cart } = useSelector((state: RootState) => state.cart);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach((item: any) => {
      total += item.price * item.quantity;
    });
    setTotal(total);
  }, [cart]);
  return (
    <div className="cart-body">
      <div className="cart-container">
        <div className="cart-list">
          {cart.length > 0 ? (
            cart.map((item: any) => <CartItem key={item._id} product={item} />)
          ) : (
            <p>No items in cart</p>
          )}
        </div>
        <div className="total">
          <p>Total: ${total}</p>
          <button>Complete Order</button>
        </div>
      </div>
    </div>
  );
};
