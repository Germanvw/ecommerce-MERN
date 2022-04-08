import { handleValidate } from "./handleFormValidation";

export const handleError = (target: any, errors: any, setErrors: any) => {
  let valid = false;
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
