import { useState } from "react";
import { LoginButton } from "../../Buttons/LoginButton";

export const Login = () => {
  const [value, setValues] = useState({
    email: "email1@mail.com",
    password: "asdasd",
  });
  return (
    <div>
      <LoginButton form={value} />
    </div>
  );
};
