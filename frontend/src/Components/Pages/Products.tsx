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
import { useSearchParams } from "react-router-dom";

export const Products = () => {
  const { productList } = useSelector((state: RootState) => state.prod);
  const dispatch = useDispatch();

  const pagOptions = [8, 16, 24, 32];
  const [searchParams, setSearchParams] = useSearchParams();

  const searchCat = searchParams.get("cat") || "none";
  const searchBrand = searchParams.get("brand") || "none";
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
    dispatch(startProdFetchAll(searchCat, searchBrand));
  }, []);

  useEffect(() => {
    dispatch(startProdFetchAll(searchCat, searchBrand));
  }, [searchCat, searchBrand]);

  return (
    <div className="products-body">
      <div className="row m-0 w-100">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10 body">
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
    </div>
  );
};
function dispatch(arg0: (dispatch: any) => Promise<void>) {
  throw new Error("Function not implemented.");
}
