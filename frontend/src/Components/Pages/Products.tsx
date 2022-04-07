import { useEffect } from "react";
import { Sidebar } from "../Items/Nav/Sidebar";
import { FormInput } from "../Items/Forms/FormInput";
import { useFilterSearch } from "../hooks/useFilterSearch";
import { usePagination } from "../hooks/usePagination";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer/rootReducer";
import { startProdFetchAll } from "../redux/actions/productActions";
import { inputProps } from "../Items/Modals/Product/imports";
import { ProductCard } from "../Items/Cards/ProductCard";
import { PaginationNav } from "../Items/Nav/PaginationNav";

import "./index.scss";

export const Products = () => {
  const { productList } = useSelector((state: RootState) => state.prod);

  const dispatch = useDispatch();

  const pagOptions = [8, 16, 24, 32];
  //Hooks
  const {
    perPage,
    handlePagination,
    pagination,
    handlePerPage,
    setPagination,
    setPerPage,
  }: any = usePagination();

  const { filterInput, handleChange, paginatedArray, array }: any =
    useFilterSearch(pagination, perPage, productList);

  //Effects
  useEffect(() => {
    dispatch(startProdFetchAll());
  }, []);

  return (
    <div className="products-body">
      <div className="col-3">
        <Sidebar />
      </div>
      <div className="body">
        <div className="filter mb-3">
          <FormInput
            value={filterInput}
            handleChange={handleChange}
            {...inputProps}
          />
        </div>
        <div className="product-display d-flex justify-content-center">
          {paginatedArray.map((product: any, index: any) => (
            <ProductCard product={product} key={product._id} index={index} />
          ))}
        </div>
        <PaginationNav
          array={array}
          perPage={perPage}
          pagination={pagination}
          pagOptions={pagOptions}
          setPagination={setPagination}
          handlePerPage={handlePerPage}
          handlePagination={handlePagination}
          setPerPage={setPerPage}
        />
      </div>
    </div>
  );
};
function dispatch(arg0: (dispatch: any) => Promise<void>) {
  throw new Error("Function not implemented.");
}
