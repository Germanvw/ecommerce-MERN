import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormInput } from "../../Items/Forms/FormInput";
import { startCatFetchAll } from "../../redux/actions/categoryActions";
import { CategoryTable } from "../../Items/Tables/CategoryTable";
import { uiOpenModalCategory } from "../../redux/actions/uiActions";
import { CategoryModal } from "../../Items/Modals/Category/CategoryModal";
import { inputProps } from "../../Items/Modals/Category/imports";
import { Pagination } from "../../Items/Buttons/Pagination";
import { DropdownPagination } from "../../Items/Forms/Dropdown";
import { usePagination } from "../../hooks/usePagination";
import { useFilterSearch } from "../../hooks/useFilterSearch";
import { RootState } from "../../redux/reducer/rootReducer";

import "./index.scss";
export const Categories = () => {
  const { categoryList }: any = useSelector((state: RootState) => state.cat);

  const dispatch = useDispatch();

  // Hooks
  const {
    perPage,
    handlePagination,
    pagination,
    handlePerPage,
    setPagination,
  }: any = usePagination();

  const { filterInput, handleChange, paginatedArray, array }: any =
    useFilterSearch(pagination, perPage, categoryList);

  //Effects
  useEffect(() => {
    dispatch(startCatFetchAll());
  }, []);

  // Functions
  const handleCreate = () => {
    dispatch(uiOpenModalCategory());
  };

  return (
    <div className="table-bg">
      <div className="table-body">
        <div className="header">
          <FormInput
            value={filterInput}
            handleChange={handleChange}
            {...inputProps}
          />
          <button onClick={handleCreate}>Create new</button>
        </div>
        <div className="table">
          <CategoryTable categories={paginatedArray} />
        </div>
        <div className="bottom">
          <div className="total">
            {`Categories found: ${array && array.length}`}
          </div>
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
              options={[5, 10, 15, 20]}
            />
          </div>
        </div>
        <CategoryModal />
      </div>
    </div>
  );
};
