import { useDispatch } from "react-redux";
import { useFilterSearch } from "../../hooks/useFilterSearch";
import { usePagination } from "../../hooks/usePagination";
import { inputProps } from "../../Items/Modals/Category/imports";
import { PaginationNav } from "../../Items/Nav/PaginationNav";
import { SearchNav } from "../../Items/Nav/SearchNav";
import { Sidebar } from "../../Items/Nav/Sidebar";
import { ProductTable } from "../../Items/Tables/ProductTable";

export const Users = () => {
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
    useFilterSearch(pagination, perPage, []);

  // Effects
  //Fetch

  return (
    <div className="users-body">
      <div className="row m-0 w-100">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="container">
            <SearchNav
              filterInput={filterInput}
              handleChange={handleChange}
              inputProps={{ ...inputProps }}
            />
            {paginatedArray.length > 0 ? (
              // <ProductTable products={paginatedArray} />
              <></>
            ) : (
              <h4 className="text-center">User list is empty</h4>
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
      {/* <BrandModal /> */}
    </div>
  );
};
