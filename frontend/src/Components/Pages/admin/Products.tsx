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
    dispatch(startProdFetchAll());
  }, []);

  const handleCreate = () => {
    dispatch(uiOpenModalProduct());
  };

  return (
    <div className="products-admin-body">
      <div className="container">
        <SearchNav
          filterInput={filterInput}
          handleChange={handleChange}
          handleCreate={handleCreate}
          inputProps={{ ...inputProps }}
        />
        <ProductTable products={paginatedArray} />
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
      <ProductModal />
    </div>
  );
};
