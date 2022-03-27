import { useState } from "react";
import { LoginButton } from "../../Buttons/LoginButton";

export const Login = () => {
  const [value, setValues] = useState({
    email: "email4@mail.com",
    password: "123456",
  });
  return (
    <div>
      <LoginButton form={value} />
    </div>
  );
};
