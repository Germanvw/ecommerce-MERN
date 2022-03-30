import { useEffect, useState } from "react";

export const usePagination = () => {
  const [perPage, setPerPage] = useState(5);
  const [pagination, setPagination] = useState({
    index: 1,
    last: 1,
    first: 1,
  });

  const handlePerPage = ({ target }: any) => {
    setPerPage(target.value);
  };

  const handlePagination = (value: number) => {
    setPagination({
      ...pagination,
      index: Math.max(
        pagination.first,
        Math.min(pagination.last, pagination.index + value)
      ),
    });
  };

  return {
    perPage,
    index: pagination.index,
    pagination,
    setPagination,
    handlePagination,
    handlePerPage,
  };
};
