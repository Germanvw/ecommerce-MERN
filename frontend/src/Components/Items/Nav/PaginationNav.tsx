import { DropdownPagination } from "../Forms/Dropdown";
import { Pagination } from "../Buttons/Pagination";

interface PaginationNavInterface {
  array: any;
  pagination: any;
  pagOptions: number[];
  perPage: number;
  setPagination: (value: any) => void;
  handlePagination: (value: number) => void;
  handlePerPage: (perPage: number) => void;
  setPerPage: (perPage: number) => void;
}

export const PaginationNav = ({
  array,
  perPage,
  pagination,
  pagOptions,
  setPagination,
  handlePerPage,
  handlePagination,
  setPerPage,
}: PaginationNavInterface) => {
  return (
    <div className="pagination-body justify-content-around">
      <div className="pag-total">
        {`Products found: ${array && array.length}`}
      </div>
      <div className="pagination">
        <Pagination
          perPage={perPage}
          howMany={array.length}
          handlePagination={handlePagination}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <div className="perPage">
        <DropdownPagination
          dwName="perPage"
          handleChange={handlePerPage}
          options={pagOptions}
          setPerPage={setPerPage}
        />
      </div>
    </div>
  );
};
