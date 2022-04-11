import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  uiClearError,
  uiCloseModal,
  uiSetError,
} from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import {
  errorPasswordInit,
  formPasswordInputs,
  initPasswordState,
} from "./imports";
import { FormInput } from "../../Forms/FormInput";
import { customProductStyles } from "../Product/imports";
import { startAuthChangePassword } from "../../../redux/actions/authActions";
import { handleError } from "../../../helpers/handleErrorInput";
import Modal from "react-modal";

import "./../styles.scss";

export const PasswordModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);

  const dispatch = useDispatch();

  // States
  const [value, setValue] = useState(initPasswordState);
  const [errors, setErrors] = useState(errorPasswordInit);

  // Functions

  const handleChange = ({ target }: any) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
    handleError(target, errors, setErrors);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(uiClearError());
    if (!errors.password && !errors.confirmPassword && !errors.oldPassword) {
      if (value.password === value.confirmPassword) {
        dispatch(
          startAuthChangePassword({
            password: value.oldPassword,
            newPassword: value.password,
            setErrors,
            setValue,
          })
        );
      } else {
        dispatch(uiSetError("Passwords must match"));
      }
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
      className={`${darkMode ? "modal-d" : "modal-l"} modal-password modal-x`}
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
              error={errors![input.name]}
              {...input}
            />
          ))}
          <button>Modificar</button>
        </form>
      </div>
    </Modal>
  );
};
