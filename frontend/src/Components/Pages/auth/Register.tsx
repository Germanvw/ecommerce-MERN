import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormInput } from "../../Items/Forms/FormInput";
import { Dropdown } from "../../Items/Forms/Dropdown";
import { startAuthRegister } from "../../redux/actions/authActions";
import { MainButton } from "../../Items/Buttons/MainButton";
import { genderOptions, initRegisterErrors, registerInputs } from "./data";
import { useState } from "react";
import { handleValidate } from "../../helpers/handleFormValidation";

import "./styles.scss";

export const Register = () => {
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    username: "",
    email: "",
    Gender: genderOptions[0]!.value,
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState(initRegisterErrors);

  const handleError = ({ target }: any) => {
    let valid = false;
    if (target.name !== "confirmPassword") {
      valid = handleValidate(target.value, "", target.type, handleError);
    } else {
      valid = handleValidate(
        target.value,
        value.password,
        target.name,
        handleError
      );
    }
    setErrors({ ...errors, [target.name]: !valid });
  };

  const handleChange = ({ target }: any) => {
    setValue({ ...value, [target.name]: target.value });
    handleError({ target });
  };

  const handleRegister = () => {
    // Validating empty/no-valid fields
    if (
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    ) {
      dispatch(startAuthRegister(value));
    }
  };

  return (
    <div className="auth_form d-flex justify-content-center align-items-center">
      <div className="register-container">
        <div className="form-body">
          <div className="top">
            <h2>Register</h2>
          </div>
          <div className="auth-form">
            {registerInputs.map((input, index) => (
              <FormInput
                key={index}
                value={value![input.name]}
                handleChange={handleChange}
                error={errors![input.name]}
                {...input}
              />
            ))}
            <div className="dropdown-gender">
              <Dropdown
                options={genderOptions}
                handleChange={handleChange}
                dwName="Gender"
              />
            </div>
          </div>
          <div className="bottom">
            <div className="auth-link">
              <Link className="ms-auto" to="/Login">
                Already have an account?
              </Link>
              <i className="fa-solid fa-arrow-right-long"></i>
            </div>
            <MainButton handleClick={handleRegister} />
          </div>
        </div>
      </div>
    </div>
  );
};
