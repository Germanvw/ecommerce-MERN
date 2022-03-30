import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { handleFilter } from "../helpers/handleFilter";
import { productPropsDocument } from "../Items/Modals/Product/imports";
import { RootState } from "../redux/reducer/rootReducer";

export const useFilterProduct = (pagination: any, perPage: number) => {
  const { productList }: any = useSelector((state: RootState) => state.prod);

  //States
  const [filterInput, setFilterInput] = useState("");
  const [array, setArray] = useState<productPropsDocument[]>([]);
  const [paginatedArray, setPaginatedArray] = useState<productPropsDocument[]>(
    []
  );

  useEffect(() => {
    const filtered = handleFilter(productList, filterInput);
    setArray(filtered);
    setPaginatedArray(handleSlice(filtered));
  }, [productList, filterInput]);

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
