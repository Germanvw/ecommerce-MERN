import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormInput } from "../../Forms/FormInput";
import useForm from "../../hooks/useForm";
import { startAuthRegister } from "../../redux/actions/authActions";

import "./index.scss";

export const Register = () => {
  const dispatch = useDispatch();

  const [value, handleChange, reset] = useForm({
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });
  const registerInputs = [
    { placeholder: "Username", type: "text", name: "username" },
    { placeholder: "Email", type: "email", name: "email" },
    { placeholder: "Gender", type: "text", name: "gender" },
    { placeholder: "Password", type: "password", name: "password" },
    {
      placeholder: "Confirm password",
      type: "password",
      name: "confirmPassword",
    },
  ];

  const handleRegister = (e) => {
    e.preventDefault();

    dispatch(startAuthRegister(value));
  };

  return (
    <div className="auth-app">
      <div className="login-container register-container">
        <div className="form-body">
          <div className="top">
            <h2>Register</h2>
          </div>
          <div className="auth-form">
            {registerInputs.map((input, index) => (
              <FormInput
                key={index}
                value={value[input.name]}
                handleChange={handleChange}
                {...input}
              />
            ))}
          </div>
          <div className="bottom">
            <button type="submit" onClick={handleRegister}>
              Login
            </button>
            <p>
              Already have an account? <Link to="/Login"> Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
