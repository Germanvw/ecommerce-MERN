import { handleValidate } from "./handleFormValidation";

export const handleError = (target: any, errors: any, setErrors: any) => {
  let valid = false;
  console.log(target.name);
  if (target.name !== "confirmPassword") {
    valid = handleValidate(target.value, target.type);
  } else {
    valid = handleValidate(target.value, target.name);
  }
  setErrors({ ...errors, [target.name]: !valid });
};
