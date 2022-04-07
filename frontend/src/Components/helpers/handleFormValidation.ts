import { IRegister } from "../Pages/auth/data";

interface RegisterValidation {
  value: IRegister;
  errors: any;
}

interface InputValidate {
  value: string;
  type: "text" | "email" | "password" | "confirmPassword";
}

export const handleRegisterValidation = ({
  value,
  errors,
}: RegisterValidation) => {};

export const handleValidate = (value: string, type: string) => {
  console.log(value, type);
  switch (type) {
    case "text":
      return value.length > 3 ? true : false;
    case "email":
      return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        ? true
        : false;
    case "password":
      return value.length > 5 ? true : false;
    case "confirmPassword":
      return value.length > 5 ? true : false;
    case "number":
      return parseInt(value) > 0 ? true : false;
    default:
      return value.length > 3 ? true : false;
  }
};
