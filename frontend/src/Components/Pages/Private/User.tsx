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
          <img src={picture} alt={picture} />
          <p className="welcome">Welcome</p>
          <h2>{username}</h2>
          <div className="change-info">
            <button onClick={handleModalUser}>Change Details</button>
            <button onClick={handleModalPassword}>Change Password</button>
          </div>
        </div>
        <div className="user-details"></div>
      </div>
      <PasswordModal />
      <UserModal />
    </div>
  );
};
