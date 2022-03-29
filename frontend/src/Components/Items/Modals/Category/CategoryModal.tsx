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
  formCategoryImputs,
  initialCategoryState,
} from "./imports";
import { FormInput } from "../../Forms/FormInput";

import Modal from "react-modal";
import "./../index.scss";

export const CategoryModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { active } = useSelector((state: RootState) => state.cat);

  const dispatch = useDispatch();

  // States
  const [category, setCategory] = useState(initialCategoryState);

  const handleFormChange = ({ target }: any) => {
    setCategory({
      ...category,
      [target.name]: target.value,
    });
  };

  // Functions

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (active) {
      dispatch(startCatUpdate(category));
    } else {
      dispatch(startCatAdd(category));
    }
  };

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    setCategory(initialCategoryState);
    dispatch(catClearActive());
  };

  // Effects
  useEffect(() => {
    if (active) {
      setCategory(active);
    }
  }, [active]);
  return (
    <Modal
      isOpen={modal.category}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className="modal"
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
              {...input}
            />
          ))}
          <button>{active ? "Editar" : "Crear"}</button>
        </form>
      </div>
    </Modal>
  );
};
