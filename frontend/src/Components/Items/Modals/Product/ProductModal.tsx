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
  errorProductInit,
  formProductsDisplay,
  initialProductState,
  customProductStyles,
} from "./imports";
import { FormInput } from "../../Forms/FormInput";
import { DropdownCategory } from "../../Forms/Dropdown";
import { startCatFetchAll } from "../../../redux/actions/categoryActions";
import {
  categoryPropsDocument,
  customCategoryStyles,
} from "../Category/imports";
import { handleError } from "../../../helpers/handleErrorInput";
import Modal from "react-modal";

import "./../styles.scss";
import { formProductsImputs } from "./imports";

export const ProductModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { categoryList } = useSelector((state: RootState) => state.cat);
  const { brandList } = useSelector((state: RootState) => state.brand);
  const { active } = useSelector((state: RootState) => state.prod);

  const dispatch = useDispatch();

  // States
  const [product, setProduct] = useState(initialProductState);
  const [categories, setCategories] = useState<categoryPropsDocument[]>([]);
  const [brands, setBrands] = useState([]);
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
    dispatch(startCatFetchAll(true));
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
    setBrands(brandList);
  }, [brandList]);

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
      isOpen={modal.product || modal.productDisplay}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className={`${darkMode ? "modal-d" : "modal-l"} modal-category modal-x`}
      style={customCategoryStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>
          {modal.productDisplay
            ? "Product Information"
            : active === null
            ? "Create product."
            : "Edit product."}
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-100 d-flex justify-content-center align-items-center flex-column"
        >
          {active ? (
            <>
              {formProductsDisplay.map((input: any) => (
                <FormInput
                  key={input.name}
                  value={product[input.name]}
                  handleChange={handleFormChange}
                  error={errors![input.name]}
                  {...input}
                />
              ))}
            </>
          ) : (
            <>
              {formProductsImputs.map((input: any) => (
                <FormInput
                  key={input.name}
                  value={product[input.name]}
                  handleChange={handleFormChange}
                  error={errors![input.name]}
                  {...input}
                />
              ))}
            </>
          )}
          <div className="dropdown-gender">
            <DropdownCategory
              dwName="category"
              options={categories}
              selected={product.category._id}
              handleChange={handleFormChange}
              disabled={modal.productDisplay}
            />
          </div>
          <div className="dropdown-gender">
            <DropdownCategory
              dwName="brand"
              options={brands}
              selected={product.brand._id}
              handleChange={handleFormChange}
              disabled={modal.productDisplay}
            />
          </div>
          {!modal.productDisplay && (
            <button>{active ? "Editar" : "Crear"}</button>
          )}
        </form>
      </div>
    </Modal>
  );
};
