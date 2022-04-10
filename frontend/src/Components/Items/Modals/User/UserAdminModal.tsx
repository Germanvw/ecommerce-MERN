import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import {
  errorUserProfileInit,
  formUserImputs,
  genderOptions,
  initialUserState,
} from "./imports";
import { FormInput } from "../../Forms/FormInput";
import { customProductStyles } from "../Product/imports";
import { Dropdown } from "../../Forms/Dropdown";
import { startAuthUserUpdate } from "../../../redux/actions/authActions";
import { handleError } from "../../../helpers/handleErrorInput";
import Modal from "react-modal";

import "./../styles.scss";

export const UserAdminModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { active } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();

  const [errors, setErrors] = useState(errorUserProfileInit);

  // States
  const [value, setValue] = useState({ ...active });
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

    if (!errors.username && !errors.email && !errors.picture) {
      dispatch(startAuthUserUpdate(value));
      setErrors(errorUserProfileInit);
    }
  };

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    setValue(initialUserState);
  };

  // Effects
  useEffect(() => {
    if (active) {
      setValue({
        username: active.username,
        email: active.email,
        gender: active.gender,
        picture: active.picture,
        active: active.active,
      });
    }
  }, [modal]);

  useEffect(() => {
    if (active) {
      setErrors({
        username: false,
        email: false,
        picture: false,
      });
    }
  }, [active]);

  if (!active) return <></>;
  return (
    <Modal
      isOpen={modal.user}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className={`${darkMode ? "modal-d" : "modal-l"} modal-product modal-x`}
      style={customProductStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>See Details</h1>

        <form onSubmit={handleSubmit}>
          {formUserImputs.map((input: any, index: any) => (
            <FormInput
              key={index}
              value={value[input.name]}
              handleChange={handleChange}
              error={errors![input.name]}
              disabled={true}
              {...input}
            />
          ))}
          <div className="dropdown-gender">
            <Dropdown
              dwName="gender"
              options={genderOptions}
              selected={active.gender}
              disabled={true}
              handleChange={handleChange}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};
