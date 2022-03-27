import { useDispatch } from "react-redux";
import { startAuthLogin } from "../redux/actions/authActions";

export const LoginButton = (form: any) => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(startAuthLogin(form));
  };
  return <button onClick={handleLogin}>Login</button>;
};
