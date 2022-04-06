import { useState } from "react";

export const useForm = (initialState: any) => {
  const [value, setValues] = useState(initialState);

  const handleChange = ({ target }: any) => {
    setValues({
      ...value,
      [target.name]: target.value,
    });
  };

  const reset = () => {
    setValues(initialState);
  };
  return [value, handleChange, reset];
};

export default useForm;
