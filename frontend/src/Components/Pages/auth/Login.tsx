import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FormInput } from "../../Items/Forms/FormInput";
import { startAuthLogin } from "../../redux/actions/authActions";
import { MainButton } from "../../Items/Buttons/MainButton";
import "./styles.scss";
import { loginInputs } from "./data";
import { handleValidate } from "../../helpers/handleFormValidation";
import { useState } from "react";

export const Login = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ email: true, password: true });

  const handleChange = ({ target }: any) => {
    setValue({ ...value, [target.name]: target.value });
    handleError({ target });
  };

  const handleLogin = () => {
    dispatch(startAuthLogin(value));
  };

  const handleError = ({ target }: any) => {
    let valid = false;
    if (target.name !== "confirmPassword") {
      valid = handleValidate(target.value, target.type);
    } else {
      valid = handleValidate(target.value, target.name);
    }
    setErrors({ ...errors, [target.name]: !valid });
  };

  return (
    <div className="auth_form d-flex justify-content-center align-items-center">
      <div className="login-container">
        <div className="form-body">
          <h2>Login</h2>
          <div className="auth-form">
            {loginInputs.map((input, index) => (
              <FormInput
                key={index}
                value={value[input.name]}
                handleChange={handleChange}
                error={errors![input.name]}
                {...input}
              />
            ))}
          </div>
          <div className="bottom">
            <div className="auth-link">
              <Link className="ms-auto" to="/Register">
                Don't have an account
              </Link>
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>
            <MainButton handleClick={handleLogin} title="Login" />
          </div>
        </div>
      </div>
    </div>
  );
};
