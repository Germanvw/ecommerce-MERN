interface genderProps {
  name: string;
  value: string;
}

interface Passwords {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface userPropsDocument {
  _id: string;
  username: string;
  email: string;
  gender: genderProps;
  picture: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export const genderOptions = [
  { name: "Male", value: "male" },
  { name: "Female", value: "female" },
];

export const initPasswordState: Passwords = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

export const initialUserState: { [index: string]: any } = {
  username: "",
  email: "",
  gender: genderOptions[0] ? genderOptions[0].value : "Male",
  picture: "",
};

export const errorUserProfileInit = {
  username: true,
  email: true,
  picture: true,
};

export const errorPasswordInit = {
  oldPassword: true,
  password: true,
  confirmPassword: true,
};

export const formPasswordInputs = [
  { placeholder: "Current Password", type: "password", name: "oldPassword" },
  { placeholder: "New Password", type: "password", name: "password" },
  {
    placeholder: "Confirm new password",
    type: "password",
    name: "confirmPassword",
  },
];

export const formUserImputs = [
  {
    label: "Username",
    placeholder: "Username",
    type: "text",
    name: "username",
  },
  { label: "Email", placeholder: "Email", type: "email", name: "email" },
  { label: "Picture", placeholder: "Picture", type: "text", name: "picture" },
];

export const formUserAdminImputs = [
  {
    label: "Username",
    placeholder: "Username",
    type: "text",
    name: "username",
    active: true,
  },
  {
    label: "Email",
    placeholder: "Email",
    type: "email",
    name: "email",
    active: true,
  },
  {
    label: "Picture",
    placeholder: "Picture",
    type: "text",
    name: "picture",
    active: true,
  },
  {
    label: "Active",
    placeholder: "Active",
    type: "text",
    name: "active",
    active: true,
  },
];
