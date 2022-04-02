import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uiClearError,
  uiCloseModal,
  uiSetError,
} from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import { formPasswordInputs, initPasswordState } from "./imports";
import { FormInput } from "../../Forms/FormInput";
import { customProductStyles } from "../Product/imports";

import Modal from "react-modal";
import { startAuthChangePassword } from "../../../redux/actions/authActions";

export const PasswordModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();

  // States
  const [value, setValue] = useState(initPasswordState);

  // Functions

  const handleChange = ({ target }: any) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(uiClearError());
    if (value.password === value.confirmPassword) {
      dispatch(
        startAuthChangePassword({
          password: value.oldPassword,
          newPassword: value.password,
        })
      );
      setValue(initPasswordState);
    } else {
      dispatch(uiSetError("Passwords must match"));
    }
  };

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    setValue(initPasswordState);
  };

  return (
    <Modal
      isOpen={modal.password}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className="modal modal-product"
      style={customProductStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>Change Password</h1>

        <form onSubmit={handleSubmit}>
          {formPasswordInputs.map((input: any) => (
            <FormInput
              key={input.name}
              value={value[input.name]}
              handleChange={handleChange}
              {...input}
            />
          ))}
          <button>Modificar</button>
        </form>
      </div>
    </Modal>
  );
};
