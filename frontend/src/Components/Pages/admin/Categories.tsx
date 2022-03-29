import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormInput } from "../../Items/Forms/FormInput";
import { startCatFetchAll } from "../../redux/actions/categoryActions";
import { CategoryTable } from "../../Items/Tables/CategoryTable";
import { RootState } from "../../redux/reducer/rootReducer";
import { uiOpenModalCategory } from "../../redux/actions/uiActions";
import { CategoryModal } from "../../Items/Modals/Category/CategoryModal";

import "./index.scss";

export const Categories = () => {
  const dispatch = useDispatch();

  const { categoryList } = useSelector((state: RootState) => state.cat);
  // States
  const [filter, setFilter] = useState("");
  const [categories] = useState([]);

  const handleChange = ({ target }: any) => {
    setFilter(target.value);
  };

  const inputProps = {
    placeholder: "Filter by name...",
    type: "text",
    name: "filter",
  };

  useEffect(() => {
    dispatch(startCatFetchAll());
  }, []);

  // Functions
  const handleCreate = () => {
    dispatch(uiOpenModalCategory());
  };

  return (
    <div className="cat-bg">
      <div className="cat-body">
        <div className="header">
          <FormInput
            value={filter}
            handleChange={handleChange}
            {...inputProps}
          />
          <button onClick={handleCreate}>Create new</button>
        </div>
        <div className="table">
          <CategoryTable categories={categoryList} />
        </div>
        <div className="bottom">
          <div className="total">{`Categories found: ${categories.length}`}</div>
          <div className="pagination">1</div>
          <div className="show-amount">1</div>
        </div>
        <CategoryModal />
      </div>
    </div>
  );
};
