export interface IRegister {
  username: string;
  email: string;
  gender: string;
  password: string;
  confirmPassword: String;
}

export const loginInputs = [
  { label: "Email", placeholder: "Email", type: "email", name: "email" },
  {
    label: "Email",
    placeholder: "Password",
    type: "password",
    name: "password",
  },
];

export const initLoginErrors = {
  email: false,
  password: false,
};

export const initRegisterErrors = {
  username: true,
  email: true,
  password: true,
  confirmPassword: true,
};

export const registerInputs = [
  {
    label: "Username",
    placeholder: "Username",
    type: "text",
    name: "username",
  },
  { label: "Email", placeholder: "Email", type: "email", name: "email" },
  {
    label: "Password",
    placeholder: "Password",
    type: "password",
    name: "password",
  },
  {
    label: "Confirm password",
    placeholder: "Confirm password",
    type: "password",
    name: "confirmPassword",
  },
];

export const genderOptions = [
  { name: "Male", value: "male" },
  { name: "Female", value: "female" },
];
