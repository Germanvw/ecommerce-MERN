import { useState } from "react";
import { CartItem } from "../../Items/Cart/CartItem";

import "./index.scss";

export const Cart = () => {
  const [cart, setCart] = useState([]);

  return (
    <div className="cart-body">
      <div className="cart-container">
        <div className="cart-header">
          {/* {cart.length > 0 ? (
            cart.map((item): any => <CartItem key={item._id} item={item} />)
          ) : (
            <h1>Cart is empty</h1>
          )} */}
          <CartItem />
        </div>
      </div>
    </div>
  );
};
