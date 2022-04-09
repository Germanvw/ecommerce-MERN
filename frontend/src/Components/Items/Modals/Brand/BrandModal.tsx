import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleError } from "../../../helpers/handleErrorInput";
import {
  startBrandAdd,
  startBrandUpdate,
} from "../../../redux/actions/brandActions";
import { catClearActive } from "../../../redux/actions/categoryActions";
import { uiCloseModal } from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import { FormInput } from "../../Forms/FormInput";
import { errorBrandInit, formBrandImputs, initialBrandState } from "./imports";
import { customCategoryStyles } from "../Category/imports";

import Modal from "react-modal";

export const BrandModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { active } = useSelector((state: RootState) => state.brand);

  const dispatch = useDispatch();

  // States
  const [brand, setBrand] = useState(initialBrandState);
  const [errors, setErrors] = useState(errorBrandInit);

  //Functions

  const handleFormChange = ({ target }: any) => {
    setBrand({
      ...brand,
      [target.name]: target.value,
    });
    handleError(target, errors, setErrors);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!errors.name && !errors.image) {
      if (active) {
        dispatch(startBrandUpdate(brand));
      } else {
        dispatch(startBrandAdd(brand));
      }
      setErrors(errorBrandInit);
    }
  };

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(catClearActive());
    setBrand(initialBrandState);
  };

  // Effects
  useEffect(() => {
    if (active) {
      setBrand(active);
    } else {
      setBrand(initialBrandState);
    }
  }, [modal]);

  useEffect(() => {
    if (active !== null) {
      setErrors({
        name: false,
        image: false,
      });
    } else {
      setErrors(errorBrandInit);
    }
  }, [active]);
  return (
    <Modal
      isOpen={modal.brand}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className={`${darkMode ? "modal-d" : "modal-l"} modal-brand modal-x`}
      style={customCategoryStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>{active === null ? "Create brand." : "Edit brand."}</h1>
        <form onSubmit={handleSubmit}>
          {formBrandImputs.map((input: any) => (
            <FormInput
              key={input.name}
              value={brand[input.name]}
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
