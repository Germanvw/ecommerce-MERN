import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFilterSearch } from "../../hooks/useFilterSearch";
import { usePagination } from "../../hooks/usePagination";
import { inputProps } from "../../Items/Modals/Category/imports";
import { PaginationNav } from "../../Items/Nav/PaginationNav";
import { SearchNav } from "../../Items/Nav/SearchNav";
import { Sidebar } from "../../Items/Nav/Sidebar";
import { OrderTable } from "../../Items/Tables/OrderTable";
import { startOrderAdmin } from "../../redux/actions/OrderActions";
import { RootState } from "../../redux/reducer/rootReducer";

export const Orders = () => {
  const { orderList } = useSelector((state: RootState) => state.order);

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
    useFilterSearch(pagination, perPage, orderList);

  //Effects
  useEffect(() => {
    dispatch(startOrderAdmin());
  }, []);

  return (
    <div className="orders-admin-body">
      <div className="row m-0 w-100">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10 body">
          <div className="container">
            <SearchNav
              filterInput={filterInput}
              handleChange={handleChange}
              inputProps={{ ...inputProps }}
            />
            <OrderTable orders={paginatedArray} />
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
      {/* <OrderModal /> */}
    </div>
  );
};
