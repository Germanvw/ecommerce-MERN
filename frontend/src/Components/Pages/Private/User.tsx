import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";
import {
  uiOpenModalPassword,
  uiOpenModalUser,
} from "../../redux/actions/uiActions";
import { PasswordModal } from "../../Items/Modals/User/PasswordModal";
import { UserModal } from "../../Items/Modals/User/UserModal";

import "./index.scss";

export const User = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { username, email, picture } = user;

  if (!user) return <div>Loading...</div>;

  // Functions

  const handleModalPassword = () => {
    dispatch(uiOpenModalPassword());
  };

  const handleModalUser = () => {
    dispatch(uiOpenModalUser());
  };

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
              <span>{user.username}</span>
            </div>
            <div className="details">
              <h3>Email: </h3>
              <span>{user.email}</span>
            </div>
            <div className="details">
              <h3>Gender: </h3>
              <span>{user.gender}</span>
            </div>
            <div className="details">
              <h3>Type: </h3>
              <span>{!user.isAdmin ? "Customer" : "Admin"}</span>
            </div>
          </div>
        </div>
        <div className="user-orders">
          <h2>Your Orders:</h2>
        </div>
      </div>
      <PasswordModal />
      <UserModal />
    </div>
  );
};
