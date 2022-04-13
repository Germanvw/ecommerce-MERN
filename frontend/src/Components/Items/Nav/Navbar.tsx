import { Link } from "react-router-dom";
import { LogoutButton } from "../Buttons/LogoutButton";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";
import { useEffect, useState } from "react";

import "./styles.scss";
import { SwitchThemeButton } from "../Buttons/SwitchThemeButton";

export const Navbar = ({ isAuth }: any) => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const [itemsCart, setItemsCart] = useState(0);

  useEffect(() => {
    let total = 0;
    cart.forEach((item: any) => {
      total += item.quantity;
    });
    setItemsCart(total);
  }, [cart]);

  return (
    <nav className="navbar navbar-expand-md">
      <div className="container">
        <div className="logo">
          <Link to="/">Ecommerce</Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="ms-auto navbar-nav d-flex justify-content-center align-items-center">
            {isAuth && (
              <>
                <div className="user align-middle">
                  <Link to="/user">Profile</Link>
                </div>
                <div className="cart mx-4">
                  <Link to="/cart">
                    <i className="fa-solid fa-cart-shopping"></i>
                    {itemsCart >= 0 && (
                      <div className="cart-amount">{itemsCart}</div>
                    )}
                  </Link>
                </div>
              </>
            )}
            <div className="theme-switch">
              <SwitchThemeButton />
            </div>
            {!isAuth ? (
              <button className="auth">
                <Link className="login" to="/login">
                  Login
                </Link>
              </button>
            ) : (
              <div className="logout">
                <LogoutButton />
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
