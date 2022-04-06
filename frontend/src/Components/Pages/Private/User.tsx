import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";
import {
  uiOpenModalPassword,
  uiOpenModalUser,
} from "../../redux/actions/uiActions";
import { PasswordModal } from "../../Items/Modals/User/PasswordModal";
import { UserModal } from "../../Items/Modals/User/UserModal";
import { OrderTableUser } from "../../Items/Tables/OrderTableUser";
import { useEffect } from "react";
import { startOrderFetchAll } from "../../redux/actions/OrderActions";
import { OrderModalUser } from "../../Items/Modals/Order/OrderModalUser";

import "./index.scss";
import UserProfile from "../../Items/Other/UserProfile";

export const User = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { orderList } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();

  // Functions

  const handleModalPassword = () => {
    dispatch(uiOpenModalPassword());
  };

  const handleModalUser = () => {
    dispatch(uiOpenModalUser());
  };

  useEffect(() => {
    dispatch(startOrderFetchAll());
  }, [dispatch]);

  if (!user) return <div>Loading...</div>;
  return (
    <div className="user-body">
      <div className="container">
        <div className="row">
          <div className="row m-0 pb-5">
            <UserProfile
              user={user}
              handleModalPassword={handleModalPassword}
              handleModalUser={handleModalUser}
            />
          </div>
          <div className="user-orders col-xl-8 col-xs-12">
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
    </div>
  );
};
