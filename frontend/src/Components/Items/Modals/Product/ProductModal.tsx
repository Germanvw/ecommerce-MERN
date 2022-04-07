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
  errorProductInit,
  formProductsImputs,
  initialProductState,
} from "./imports";
import { FormInput } from "../../Forms/FormInput";
import { DropdownCategory } from "../../Forms/Dropdown";
import { startCatFetchAll } from "../../../redux/actions/categoryActions";
import { categoryPropsDocument } from "../Category/imports";
import { handleError } from "../../../helpers/handleErrorInput";
import Modal from "react-modal";

import "./../styles.scss";

export const ProductModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { categoryList } = useSelector((state: RootState) => state.cat);
  const { active } = useSelector((state: RootState) => state.prod);

  const dispatch = useDispatch();

  // States
  const [product, setProduct] = useState(initialProductState);
  const [categories, setCategories] = useState<categoryPropsDocument[]>([]);
  const [errors, setErrors] = useState(errorProductInit);

  // Effects
  const handleFormChange = ({ target }: any) => {
    setProduct({
      ...product,
      [target.name]: target.value,
    });
    handleError(target, errors, setErrors);
  };

  // Functions

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!errors.name && !errors.description && !errors.image && !errors.price) {
      if (active) {
        dispatch(startProdUpdate(product));
      } else {
        dispatch(startProdAdd(product));
      }
      setErrors(errorProductInit);
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
    } else {
      setProduct(initialProductState);
    }
  }, [active]);

  useEffect(() => {
    // Fetch
    dispatch(startCatFetchAll());
  }, []);

  useEffect(() => {
    if (!active) {
      if (categories[0]) {
        setProduct({ ...initialProductState, category: categories[0]._id });
      }
    }
  }, [categories]);

  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

  useEffect(() => {
    if (active !== null) {
      setErrors({
        name: false,
        description: false,
        image: false,
        price: false,
        inStock: false,
      });
    } else {
      setErrors(errorProductInit);
    }
  }, [active]);

  return (
    <Modal
      isOpen={modal.product}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className={`${darkMode ? "modal-d" : "modal-l"} modal-product modal-x`}
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
              error={errors![input.name]}
              {...input}
            />
          ))}
          <div className="dropdown-gender">
            <DropdownCategory
              dwName="category"
              options={categories}
              selected={product.category._id}
              handleChange={handleFormChange}
            />
          </div>
          <button>{active ? "Editar" : "Crear"}</button>
        </form>
      </div>
    </Modal>
  );
};
