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
import { handleError } from "../../../helpers/handleErrorInput";

export const UserModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);

  const errorInit = {
    username: true,
    email: true,
    picture: true,
  };
  const [errors, setErrors] = useState(errorInit);

  const dispatch = useDispatch();

  // States
  const [value, setValue] = useState({ ...user });
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
  }, [modal]);
  // Functions

  const handleChange = ({ target }: any) => {
    console.log(target.name, target.value);
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
      setErrors(errorInit);
    }
  };

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    setValue(initialUserState);
  };
  useEffect(() => {
    if (user) {
      setErrors({
        username: false,
        email: false,
        picture: false,
      });
    }
  }, [user]);
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
        <h1>Change Details</h1>

        <form onSubmit={handleSubmit}>
          {formUserImputs.map((input: any, index: any) => (
            <FormInput
              key={index}
              value={value[input.name]}
              handleChange={handleChange}
              error={errors![input.name]}
              {...input}
            />
          ))}
          <div className="dropdown-gender">
            <Dropdown
              options={genderOptions}
              handleChange={handleChange}
              dwName="gender"
              selected={user.gender}
            />
          </div>
          <button>Modificar</button>
        </form>
      </div>
    </Modal>
  );
};
