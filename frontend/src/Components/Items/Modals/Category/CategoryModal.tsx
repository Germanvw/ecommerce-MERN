import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  catClearActive,
  startCatAdd,
  startCatUpdate,
} from "../../../redux/actions/categoryActions";
import { uiCloseModal } from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import {
  customCategoryStyles,
  errorCategoryInit,
  formCategoryImputs,
  initialCategoryState,
} from "./imports";
import { FormInput } from "../../Forms/FormInput";
import { handleError } from "../../../helpers/handleErrorInput";
import Modal from "react-modal";

import "./../styles.scss";

export const CategoryModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { active } = useSelector((state: RootState) => state.cat);

  const dispatch = useDispatch();

  // States
  const [category, setCategory] = useState(initialCategoryState);
  const [errors, setErrors] = useState(errorCategoryInit);

  //Functions

  const handleFormChange = ({ target }: any) => {
    setCategory({
      ...category,
      [target.name]: target.value,
    });
    handleError(target, errors, setErrors);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!errors.name && !errors.description && !errors.image) {
      if (active) {
        dispatch(startCatUpdate(category));
      } else {
        dispatch(startCatAdd(category));
      }
      setErrors(errorCategoryInit);
    }
  };

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(catClearActive());
    setCategory(initialCategoryState);
  };

  // Effects
  useEffect(() => {
    if (active) {
      setCategory(active);
    } else {
      setCategory(initialCategoryState);
    }
  }, [modal]);

  useEffect(() => {
    if (active !== null) {
      setErrors({
        name: false,
        description: false,
        image: false,
      });
    } else {
      setErrors(errorCategoryInit);
    }
  }, [active]);

  return (
    <Modal
      isOpen={modal.category}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className={`${darkMode ? "modal-d" : "modal-l"} modal-category modal-x`}
      style={customCategoryStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>{active === null ? "Create category." : "Edit category."}</h1>

        <form onSubmit={handleSubmit}>
          {formCategoryImputs.map((input: any) => (
            <FormInput
              key={input.name}
              value={category[input.name]}
              handleChange={handleFormChange}
              error={errors![input.name]}
              {...input}
            />
          ))}
          <button>{active ? "Editar" : "Crear"}</button>
        </form>
      </div>
    </Modal>
  );
};
