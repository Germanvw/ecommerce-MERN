import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormInput } from "../../Items/Forms/FormInput";
import { startCatFetchAll } from "../../redux/actions/categoryActions";
import { CategoryTable } from "../../Items/Tables/CategoryTable";
import { uiOpenModalCategory } from "../../redux/actions/uiActions";
import { CategoryModal } from "../../Items/Modals/Category/CategoryModal";
import {
  categoryPropsDocument,
  inputProps,
} from "../../Items/Modals/Category/imports";
import { RootState } from "../../redux/reducer/rootReducer";

import "./index.scss";
export const Categories = () => {
  const dispatch = useDispatch();

  const { categoryList }: any = useSelector((state: RootState) => state.cat);

  // States
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState<categoryPropsDocument[]>([]);

  //Effects
  useEffect(() => {
    dispatch(startCatFetchAll());
  }, []);

  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

  useEffect(() => {
    if (filter === "") {
      setCategories(categoryList);
    } else {
      const filtered: categoryPropsDocument[] = categoryList.filter(
        (cat: any) => cat.name.includes(filter)
      );
      setCategories(filtered);
    }
  }, [filter]);

  // Functions
  const handleCreate = () => {
    dispatch(uiOpenModalCategory());
  };

  const handleChange = ({ target }: any) => {
    setFilter(target.value);
  };

  return (
    <div className="table-bg">
      <div className="table-body">
        <div className="header">
          <FormInput
            value={filter}
            handleChange={handleChange}
            {...inputProps}
          />
          <button onClick={handleCreate}>Create new</button>
        </div>
        <div className="table">
          <CategoryTable categories={categories} />
        </div>
        <div className="bottom">
          <div className="total">{`Categories found: ${
            categories && categories?.length
          }`}</div>
          <div className="pagination">1</div>
          <div className="show-amount">1</div>
        </div>
        <CategoryModal />
      </div>
    </div>
  );
};
