import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormInput } from "../../Forms/FormInput";
import useForm from "../../hooks/useForm";
import { startAuthLogin } from "../../redux/actions/authActions";

import "./index.scss";

export const Login = () => {
  const dispatch = useDispatch();

  const [value, handleChange, reset] = useForm({
    email: "",
    password: "",
  });
  const loginInputs = [
    { placeholder: "Email", type: "email", name: "email" },
    { placeholder: "Password", type: "password", name: "password" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    dispatch(startAuthLogin(value));
  };

  return (
    <div className="auth-app">
      <div className="login-container">
        <div className="form-body">
          <div className="top">
            <h2>Log In</h2>
          </div>
          <div className="auth-form">
            {loginInputs.map((input, index) => (
              <FormInput
                key={index}
                value={value[input.name]}
                handleChange={handleChange}
                {...input}
              />
            ))}
          </div>
          <div className="bottom">
            <button type="submit">Login</button>
            <p>
              Don't have an account? <Link to="/Register"> Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
