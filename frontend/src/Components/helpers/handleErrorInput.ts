import { handleValidate } from "./handleFormValidation";

export const handleError = (target: any, errors: any, setErrors: any) => {
  console.log(target.name);
  let valid = false;
  console.log(target.name);
  if (
    target.name !== "confirmPassword" ||
    target.name !== "inStock" ||
    target.name !== "price"
  ) {
    valid = handleValidate(target.value, target.type);
  } else {
    valid = handleValidate(target.value, target.name);
  }
  setErrors({ ...errors, [target.name]: !valid });
};
