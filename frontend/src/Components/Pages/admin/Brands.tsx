import { useDispatch } from "react-redux";
import { useFilterSearch } from "../../hooks/useFilterSearch";
import { usePagination } from "../../hooks/usePagination";
import { BrandModal } from "../../Items/Modals/Brand/BrandModal";
import { inputProps } from "../../Items/Modals/Category/imports";
import { PaginationNav } from "../../Items/Nav/PaginationNav";
import { SearchNav } from "../../Items/Nav/SearchNav";
import { Sidebar } from "../../Items/Nav/Sidebar";
import { ProductTable } from "../../Items/Tables/ProductTable";
import { uiOpenModalBrand } from "../../redux/actions/uiActions";

export const Brands = () => {
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
  const handleCreate = () => {
    dispatch(uiOpenModalBrand());
  };

  return (
    <div className="brands-body">
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
        </div>
      </div>
      <BrandModal />
    </div>
  );
};
