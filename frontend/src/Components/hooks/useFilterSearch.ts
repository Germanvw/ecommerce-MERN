import { useEffect, useState } from "react";
import { handleFilter } from "../helpers/handleFilter";

export const useFilterSearch = (
  pagination: any,
  perPage: number,
  dbData: []
) => {
  //States
  const [filterInput, setFilterInput] = useState("");
  const [array, setArray] = useState([]);
  const [paginatedArray, setPaginatedArray] = useState([]);

  useEffect(() => {
    const filtered = handleFilter(dbData, filterInput);
    setArray(filtered);
    setPaginatedArray(handleSlice(filtered));
  }, [dbData, filterInput]);

  useEffect(() => {
    setPaginatedArray(handleSlice(array));
  }, [pagination.index, perPage]);

  // Functions
  const handleChange = ({ target }: any) => {
    setFilterInput(target.value);
  };

  const handleSlice = (array: any) => {
    return array.slice(
      (pagination.index - 1) * perPage,
      pagination.index * perPage
    );
  };
  return { filterInput, handleChange, paginatedArray, array };
};
