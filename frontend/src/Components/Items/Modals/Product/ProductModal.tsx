import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prodClearActive } from "../../../redux/actions/productActions";
import { uiCloseModal } from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import {
  customProductStyles,
  formProductsImputs,
  initialProductState,
} from "./imports";

import Modal from "react-modal";
import { FormInput } from "../../Forms/FormInput";
import { Dropdown } from "../../Forms/Dropdown";
import { startCatFetchAll } from "../../../redux/actions/categoryActions";

export const ProductModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { active } = useSelector((state: RootState) => state.prod);
  const { categoryList } = useSelector((state: RootState) => state.cat);

  const dispatch = useDispatch();

  // States
  const [product, setProduct] = useState(initialProductState);
  const [categories, setCategories] = useState([]);
  const handleFormChange = ({ target }: any) => {
    setProduct({
      ...product,
      [target.name]: target.value,
    });
  };

  // Functions

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (active) {
      // dispatch(startProdUpdate(product));
    } else {
      // dispatch(startProdAdd(product));
    }
  };

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    setProduct(initialProductState);
    dispatch(prodClearActive());
  };

  // Effects
  useEffect(() => {
    if (active) {
      setProduct(active);
    }
  }, [active]);

  useEffect(() => {
    dispatch(startCatFetchAll());
  }, []);

  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);
  return (
    <Modal
      isOpen={modal.category}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className="modal modal-product"
      style={customProductStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>{active === null ? "Create category." : "Edit category."}</h1>

        <form onSubmit={handleSubmit}>
          {formProductsImputs.map((input: any) => (
            <FormInput
              key={input.name}
              value={product[input.name]}
              handleChange={handleFormChange}
              {...input}
            />
          ))}
          <div className="dropdown-category">
            <label>Category </label>
            <Dropdown
              options={categories}
              dwName="category"
              handleChange={handleFormChange}
            />
          </div>
          <button>{active ? "Editar" : "Crear"}</button>
        </form>
      </div>
    </Modal>
  );
};
