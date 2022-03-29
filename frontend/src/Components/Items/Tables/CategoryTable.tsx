import { useDispatch } from "react-redux";
import { confirmDeleteCategory } from "../../hooks/useConfirmModal";
import { catSetActive } from "../../redux/actions/categoryActions";
import { uiOpenModalCategory } from "../../redux/actions/uiActions";

import "./index.scss";

export const CategoryTable = ({ categories }: any) => {
  const dispatch = useDispatch();
  const header = [
    "Id",
    "Img",
    "Name",
    "Description",
    "More Info",
    "Update",
    "Delete",
  ];
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
    <table>
      <thead>
        <tr>
          {header.map((item: string) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 &&
          categories.map((category: any) => (
            <tr key={category._id}>
              <td>{`${category._id.slice(0, 10)}...`}</td>
              <td>
                <img src={category.image} alt={category.image} />
              </td>
              <td>{category.name}</td>
              <td>{`${category.description.slice(0, 25)} ...`}</td>
              <td>
                <button
                  className="more"
                  onClick={() => handleDisplay(category)}
                >
                  Show More
                </button>
              </td>
              <td>
                <button
                  className="update"
                  onClick={() => handleUpdate(category)}
                >
                  Update
                </button>
              </td>
              <td>
                <button
                  className="delete"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
