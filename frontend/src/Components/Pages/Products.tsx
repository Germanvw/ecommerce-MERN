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
import { Pagination } from "../Items/Buttons/Pagination";
import { DropdownPagination } from "../Items/Forms/Dropdown";

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
    <div className="wrapper">
      <Sidebar />
      <div className="body">
        <div className="filter">
          <FormInput
            value={filterInput}
            handleChange={handleChange}
            {...inputProps}
          />
        </div>
        <div className="product-display">
          {paginatedArray.map((product: any) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </div>
        <div className="pagination-body">
          <div className="pag-total">{`Products found: ${
            array && array.length
          }`}</div>
          <Pagination
            length={array.length}
            perPage={perPage}
            handlePagination={handlePagination}
            pagination={pagination}
            setPagination={setPagination}
          />
          <div className="perPage">
            <DropdownPagination
              dwName="perPage"
              handleChange={handlePerPage}
              options={pagOptions}
              setPerPage={setPerPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
function dispatch(arg0: (dispatch: any) => Promise<void>) {
  throw new Error("Function not implemented.");
}
