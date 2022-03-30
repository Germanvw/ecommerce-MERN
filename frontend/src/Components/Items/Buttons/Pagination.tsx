import "./index.scss";
import { useState, useEffect } from "react";

export const Pagination = ({
  perPage,
  length,
  handlePagination,
  pagination,
  setPagination,
}: {
  perPage: number;
  length: number;
  handlePagination: (value: number) => void;
  pagination: any;
  setPagination: any;
}) => {
  const { index, last, first } = pagination;

  useEffect(() => {
    setPagination({
      ...pagination,
      index: 1,
      last: Math.ceil(length / perPage),
    });
  }, [perPage, length]);

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
