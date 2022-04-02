import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import { formUserImputs, genderOptions, initialUserState } from "./imports";
import { FormInput } from "../../Forms/FormInput";
import { customProductStyles } from "../Product/imports";

import Modal from "react-modal";
import { Dropdown } from "../../Forms/Dropdown";
import { startAuthUserUpdate } from "../../../redux/actions/authActions";

export const UserModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  // States
  const [value, setValue] = useState(initialUserState);

  // Effects
  useEffect(() => {
    if (user) {
      setValue({
        username: user.username,
        email: user.email,
        gender: user.gender,
        picture: user.picture,
      });
    }
  }, []);
  // Functions

  const handleChange = ({ target }: any) => {
    setValue({
      ...value,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(startAuthUserUpdate(value));
  };

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    setValue(initialUserState);
  };
  return (
    <Modal
      isOpen={modal.user}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className="modal modal-product"
      style={customProductStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>Change Details</h1>

        <form onSubmit={handleSubmit}>
          {formUserImputs.map((input: any) => (
            <FormInput
              key={input.name}
              value={value[input.name]}
              handleChange={handleChange}
              {...input}
            />
          ))}
          <div className="dropdown-gender">
            <label>Gender: </label>
            <Dropdown
              options={genderOptions}
              handleChange={handleChange}
              dwName="gender"
            />
          </div>
          <button>Modificar</button>
        </form>
      </div>
    </Modal>
  );
};
