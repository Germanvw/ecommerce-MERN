import { useDispatch } from "react-redux";
import { confirmDeleteCategory } from "../../hooks/useConfirmModal";
import { catSetActive } from "../../redux/actions/categoryActions";
import { uiOpenModalCategory } from "../../redux/actions/uiActions";
import { headerTableCategories } from "./imports";

import "./index.scss";

export const CategoryTable = ({ categories }: any) => {
  const dispatch = useDispatch();

  const handleDelete = (_id: string) => {
    confirmDeleteCategory(_id, dispatch);
  };

  const handleUpdate = (category: {}) => {
    dispatch(catSetActive(category));
    dispatch(uiOpenModalCategory());
  };

  const handleDisplay = (category: {}) => {
    dispatch(catSetActive(category));
    dispatch(uiOpenModalCategory());
  };

  return (
    <table className="table custom-table">
      <thead>
        <tr>
          {headerTableCategories.map((item: string) => {
            if (item === "Id") {
              return (
                <th
                  key={item}
                  scope="col"
                  className="d-lg-table-cell d-none  text-center"
                >
                  {item}
                </th>
              );
            } else if (item === "Img") {
              return (
                <th
                  key={item}
                  scope="col"
                  className="d-md-table-cell d-none text-center"
                >
                  {item}
                </th>
              );
            } else {
              return (
                <th key={item} scope="col" className="text-center">
                  {item}
                </th>
              );
            }
          })}
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 &&
          categories.map((category: any) => (
            <tr key={category._id}>
              <td className="d-lg-table-cell d-none text-center align-middle">
                {category._id}
              </td>
              <td className="align-middle text-center">{category.name}</td>
              <td className="d-md-table-cell d-none text-center">
                <img src={category.image} alt={category.image} />
              </td>
              <td className="align-middle text-center">
                <button
                  className="update"
                  onClick={() => handleUpdate(category)}
                >
                  Update
                </button>
              </td>
              <td className="align-middle  text-center">
                <button
                  className="delete"
                  onClick={() => handleDelete(category._id)}
                >
                  {category.active ? "Desactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
