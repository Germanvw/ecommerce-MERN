import { useEffect, useState } from "react";
import {
  productPropsDocument,
  inputProps,
} from "../../Items/Modals/Product/imports";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";
import { startProdFetchAll } from "../../redux/actions/productActions";
import { ProductModal } from "../../Items/Modals/Product/ProductModal";
import { ProductTable } from "../../Items/Tables/ProductTable";
import { uiOpenModalProduct } from "../../redux/actions/uiActions";
import { FormInput } from "../../Items/Forms/FormInput";

export const Products = () => {
  const dispatch = useDispatch();
  const { productList }: any = useSelector((state: RootState) => state.prod);
  //States
  const [filter, setFilter] = useState("");
  const [products, setProducts] = useState<productPropsDocument[]>([]);
  //Effects
  useEffect(() => {
    dispatch(startProdFetchAll());
  }, []);

  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  useEffect(() => {
    if (filter === "") {
      setProducts(productList);
    } else {
      const filtered: productPropsDocument[] = productList.filter((prod: any) =>
        prod.name.includes(filter)
      );
      setProducts(filtered);
    }
  }, [filter]);

  const handleCreate = () => {
    dispatch(uiOpenModalProduct());
  };
  const handleChange = ({ target }: any) => {
    setFilter(target.value);
  };
  console.log(products);
  return (
    <div className="table-bg">
      <div className="table-body">
        <div className="header">
          <FormInput
            value={filter}
            handleChange={handleChange}
            {...inputProps}
          />
          <button onClick={handleCreate}>Create new</button>
        </div>
        <div className="table">
          <ProductTable products={products} />
        </div>
        <div className="bottom">
          <div className="total">{`Products found: ${
            products && products?.length
          }`}</div>
          <div className="pagination">1</div>
          <div className="show-amount">1</div>
        </div>
        <ProductModal />
      </div>
    </div>
  );
};
