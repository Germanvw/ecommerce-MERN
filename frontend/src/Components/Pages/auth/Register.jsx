import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormInput } from "../../Items/Forms/FormInput";
import { Dropdown } from "../../Items/Forms/Dropdown";
import { startAuthRegister } from "../../redux/actions/authActions";
import useForm from "../../hooks/useForm";
import "./index.scss";

export const Register = () => {
  const dispatch = useDispatch();

  const { errorMsg } = useSelector((state: any) => state.auth);

  const genderOptions = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];

  const [value, handleChange, clear] = useForm({
    username: "",
    email: "",
    gender: genderOptions[0].value,
    password: "",
    confirmPassword: "",
  });
  const registerInputs = [
    { placeholder: "Username", type: "text", name: "username" },
    { placeholder: "Email", type: "email", name: "email" },
    { placeholder: "Password", type: "password", name: "password" },
    {
      placeholder: "Confirm password",
      type: "password",
      name: "confirmPassword",
    },
  ];

  const handleRegister = (e) => {
    e.preventDefault();
    // Validating empty/no-valid fields

    dispatch(startAuthRegister(value));

    if (!errorMsg) {
      clear();
    }
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
            <div className="dropdown-gender">
              <label>Gender: </label>
              <Dropdown
                options={genderOptions}
                handleChange={handleChange}
                dwName="gender"
              />
            </div>
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
