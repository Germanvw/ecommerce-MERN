import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";
import {
  uiOpenModalPassword,
  uiOpenModalUser,
} from "../../redux/actions/uiActions";
import { PasswordModal } from "../../Items/Modals/User/PasswordModal";
import { UserModal } from "../../Items/Modals/User/UserModal";

import "./index.scss";
import { OrderTableUser } from "../../Items/Tables/OrderTableUser";
import { useEffect } from "react";
import { startOrderFetchAll } from "../../redux/actions/OrderActions";
import { OrderModalUser } from "../../Items/Modals/Order/OrderModalUser";

export const User = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { orderList } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();

  const { username, email, picture, gender, isAdmin } = user;

  // Functions

  const handleModalPassword = () => {
    dispatch(uiOpenModalPassword());
  };

  const handleModalUser = () => {
    dispatch(uiOpenModalUser());
  };

  useEffect(() => {
    console.log("entro");
    dispatch(startOrderFetchAll());
  }, []);

  if (!user) return <div>Loading...</div>;
  return (
    <div className="user-body">
      <div className="user-container">
        <div className="user-info">
          <div className="user-info-container">
            <img src={picture} alt={picture} />
            <p className="welcome">Welcome</p>
            <h2>{username}</h2>
            <div className="change-info">
              <button onClick={handleModalUser}>Change Details</button>
              <button onClick={handleModalPassword}>Change Password</button>
            </div>
          </div>
          <div className="user-details">
            <h2>User Details:</h2>
            <div className="details">
              <h3>Username: </h3>
              <span>{username}</span>
            </div>
            <div className="details">
              <h3>Email: </h3>
              <span>{email}</span>
            </div>
            <div className="details">
              <h3>Gender: </h3>
              <span>{gender}</span>
            </div>
            <div className="details">
              <h3>Type: </h3>
              <span>{!isAdmin ? "Customer" : "Admin"}</span>
            </div>
          </div>
        </div>
        <div className="user-orders">
          <h2>Your Orders:</h2>
          <div className="table">
            <OrderTableUser orders={orderList} />
          </div>
        </div>
      </div>
      <PasswordModal />
      <UserModal />
      <OrderModalUser />
    </div>
  );
};
