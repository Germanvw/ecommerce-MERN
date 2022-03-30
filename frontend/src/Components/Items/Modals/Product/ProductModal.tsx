import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  prodClearActive,
  startProdAdd,
  startProdUpdate,
} from "../../../redux/actions/productActions";
import { uiCloseModal } from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import {
  customProductStyles,
  formProductsImputs,
  initialProductState,
} from "./imports";
import { FormInput } from "../../Forms/FormInput";
import { DropdownCategory } from "../../Forms/Dropdown";
import { startCatFetchAll } from "../../../redux/actions/categoryActions";
import { categoryPropsDocument } from "../Category/imports";

import Modal from "react-modal";

export const ProductModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { active } = useSelector((state: RootState) => state.prod);
  const { categoryList } = useSelector((state: RootState) => state.cat);

  const dispatch = useDispatch();

  // States
  const [product, setProduct] = useState(initialProductState);
  const [categories, setCategories] = useState<categoryPropsDocument[]>([]);

  // Effects
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
      dispatch(startProdUpdate(product));
    } else {
      dispatch(startProdAdd(product));
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
    // Fetch
    dispatch(startCatFetchAll());
  }, []);

  useEffect(() => {
    if (categories[0]) {
      console.log(categories[0]);
      setProduct({ ...initialProductState, category: categories[0]._id });
    }
  }, [categories]);

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
        <h1>{active === null ? "Create product." : "Edit product."}</h1>

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
            <DropdownCategory
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
