import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogoutButton } from "../Items/Buttons/LogoutButton";
import { RootState } from "../redux/reducer/rootReducer";

export const Homepage = () => {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  return (
    <div>
      {isAuth && <LogoutButton />}
      {isAuth && <Link to="/User">User</Link>}
    </div>
  );
};
