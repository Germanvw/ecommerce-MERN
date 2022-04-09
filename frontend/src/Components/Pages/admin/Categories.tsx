import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCatFetchAll } from "../../redux/actions/categoryActions";
import { CategoryTable } from "../../Items/Tables/CategoryTable";
import { uiOpenModalCategory } from "../../redux/actions/uiActions";
import { CategoryModal } from "../../Items/Modals/Category/CategoryModal";
import { inputProps } from "../../Items/Modals/Category/imports";
import { usePagination } from "../../hooks/usePagination";
import { useFilterSearch } from "../../hooks/useFilterSearch";
import { RootState } from "../../redux/reducer/rootReducer";
import { PaginationNav } from "../../Items/Nav/PaginationNav";
import { SearchNav } from "../../Items/Nav/SearchNav";
import { Sidebar } from "../../Items/Nav/Sidebar";

import "./styles.scss";

export const Categories = () => {
  const { categoryList }: any = useSelector((state: RootState) => state.cat);

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
    useFilterSearch(pagination, perPage, categoryList);

  // Functions
  const handleCreate = () => {
    dispatch(uiOpenModalCategory());
  };

  //Effects
  useEffect(() => {
    dispatch(startCatFetchAll());
  }, []);

  return (
    <div className="categories-body">
      <div className="row m-0 w-100">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="container">
            <SearchNav
              filterInput={filterInput}
              handleChange={handleChange}
              handleCreate={handleCreate}
              inputProps={{ ...inputProps }}
            />
            <CategoryTable categories={paginatedArray} />
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
      <CategoryModal />
    </div>
  );
};
