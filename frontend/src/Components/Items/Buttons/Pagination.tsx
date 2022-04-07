import { useEffect } from "react";

import "./index.scss";

interface PaginationProps {
  perPage: number;
  howMany: number;
  pagination: any;
  handlePagination: (value: number) => void;
  setPagination: (value: any) => void;
}

export const Pagination = ({
  perPage,
  howMany,
  pagination,
  handlePagination,
  setPagination,
}: PaginationProps) => {
  const { index, last, first } = pagination;

  useEffect(() => {
    setPagination({
      ...pagination,
      index: 1,
      last: Math.ceil(howMany / perPage),
    });
  }, [perPage, howMany]);

  return (
    <div className="pagination-body">
      <button
        className={`right ${index === first && "disabled"}`}
        onClick={() => handlePagination(-1)}
      >
        <i className="fa-solid fa-angle-left"></i>
      </button>
      <div className="current">{index}</div>
      <button
        className={`right ${index === last && "disabled"}`}
        onClick={() => handlePagination(+1)}
      >
        <i className="fa-solid fa-angle-right"></i>
      </button>
    </div>
  );
};
