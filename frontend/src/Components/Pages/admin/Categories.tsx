import { FormInput } from "../../Items/Forms/FormInput";
import { useState, useEffect } from "react";

import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";
import { startCatFetchAll } from "../../redux/actions/categoryActioions";

export const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.cat);

  const [value, setValue] = useState("");

  const [catList, setCatList] = useState([]);

  const handleChange = ({ target }: any) => {
    setValue(target.value);
  };
  const inputProps = { placeholder: "Filter", type: "text", name: "filter" };

  const header = [
    "Id",
    "Img",
    "Name",
    "Description",
    "More Info",
    "Update",
    "Delete",
  ];

  useEffect(() => {
    dispatch(startCatFetchAll());
  }, []);

  return (
    <div className="cat-bg">
      <div className="cat-body">
        <div className="header">
          <FormInput
            value={value}
            handleChange={handleChange}
            {...inputProps}
          />
          <button>Create new</button>
        </div>
        <div className="table">
          <table>
            <thead>
              <tr>
                {header.map((item: string) => (
                  <th key={item}>{item}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {categories.map(({ _id, image, name, description }: any) => (
                <tr key={_id}>
                  <td>{`${_id.slice(0, 10)}...`}</td>
                  <td>
                    <img src={image} alt={image} />
                  </td>
                  <td>{name}</td>
                  <td>{`${description.slice(0, 25)} ...`}</td>
                  <td>
                    <button className="more">Show More</button>
                  </td>
                  <td>
                    <button className="update">Update</button>
                  </td>
                  <td>
                    <button className="delete">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bottom">
          <div className="total">{`Categories found: ${categories.length}`}</div>
          <div className="pagination">1</div>
          <div className="show-amount">1</div>
        </div>
      </div>
    </div>
  );
};
