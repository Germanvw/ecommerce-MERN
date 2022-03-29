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

  const { categoryList } = useSelector((state) => state.cat);

  // States
  const [filter, setFilter] = useState("");
  const [categories, setCategories] = useState([]);

  const handleChange = ({ target }) => {
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

  useEffect(() => {
    setCategories(categoryList);
  }, [categoryList]);

  useEffect(() => {
    if (filter === "") {
      setCategories(categoryList);
    } else {
      const filtered = categoryList.filter((cat) => cat.name.includes(filter));
      setCategories(filtered);
    }
  }, [filter]);

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
