import { useEffect } from "react";
import { inputProps } from "../../Items/Modals/Product/imports";
import { useDispatch, useSelector } from "react-redux";
import { startProdFetchAll } from "../../redux/actions/productActions";
import { ProductModal } from "../../Items/Modals/Product/ProductModal";
import { ProductTable } from "../../Items/Tables/ProductTable";
import { uiOpenModalProduct } from "../../redux/actions/uiActions";
import { usePagination } from "../../hooks/usePagination";
import { useFilterSearch } from "../../hooks/useFilterSearch";
import { RootState } from "../../redux/reducer/rootReducer";
import { PaginationNav } from "../../Items/Nav/PaginationNav";
import { SearchNav } from "../../Items/Nav/SearchNav";
import { Sidebar } from "../../Items/Nav/Sidebar";

import "./styles.scss";

export const Products = () => {
  const { productList } = useSelector((state: RootState) => state.prod);

  const dispatch = useDispatch();
  const pagOptions = [5, 10, 15, 20];

  // Hooks
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
    dispatch(startProdFetchAll("none", "none"));
  }, []);

  const handleCreate = () => {
    dispatch(uiOpenModalProduct());
  };

  return (
    <div className="products-admin-body">
      <div className="row m-0 w-100">
        <div className="col-lg-2 p-0">
          <Sidebar />
        </div>
        <div className="col-lg-10">
          <div className="container">
            <SearchNav
              filterInput={filterInput}
              handleChange={handleChange}
              handleCreate={handleCreate}
              inputProps={{ ...inputProps }}
            />
            {paginatedArray.length > 0 ? (
              <ProductTable products={paginatedArray} />
            ) : (
              <h4 className="text-center">Product list is empty</h4>
            )}
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
      <ProductModal />
    </div>
  );
};
