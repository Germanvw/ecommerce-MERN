import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleFilter } from "../helpers/handleFilter";
import { categoryPropsDocument } from "../Items/Modals/Category/imports";
import { RootState } from "../redux/reducer/rootReducer";

export const useFilterCategory = (pagination: any, perPage: number) => {
  const { categoryList }: any = useSelector((state: RootState) => state.cat);

  //States
  const [filterInput, setFilterInput] = useState("");
  const [array, setArray] = useState<categoryPropsDocument[]>([]);
  const [paginatedArray, setPaginatedArray] = useState<categoryPropsDocument[]>(
    []
  );

  useEffect(() => {
    const filtered = handleFilter(categoryList, filterInput);
    setArray(filtered);
    setPaginatedArray(handleSlice(filtered));
  }, [categoryList, filterInput]);

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
