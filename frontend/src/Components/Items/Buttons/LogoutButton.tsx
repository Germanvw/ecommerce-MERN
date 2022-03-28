import { useDispatch } from "react-redux";
import { startAuthLogout } from "../../redux/actions/authActions";

export const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startAuthLogout());
  };

  return <button onClick={handleLogout}>Logout</button>;
};
