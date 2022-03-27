import { useState } from "react";
import { useDispatch } from "react-redux";
import { startAuthRegister } from "../../redux/actions/authActions";

export const Register = () => {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    username: "german",
    email: "email4@mail.com",
    password: "asdasd",
    gender: "male",
  });

  const handleRegister = () => {
    console.log("Form: ", form);
    dispatch(startAuthRegister({ form }));
  };
  return (
    <div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};
