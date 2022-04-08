import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/reducer/rootReducer";
import { adminRoutes } from "../../router/routes";
import { NavLink, useNavigate } from "react-router-dom";
import { DropdownCategory } from "../Forms/Dropdown";

import "./styles.scss";
import { startCatFetchAll } from "../../redux/actions/categoryActions";

export const Sidebar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { categoryList } = useSelector((state: RootState) => state.cat);
  // const { brandList } = useSelector((state: RootState) => state.brand);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // States
  const [category, setCategory] = useState({ category: "" });
  const [brand, setBrand] = useState({ brand: "" });

  let str = "/products";
  const indexCat = {
    _id: "12",
    name: "Select One",
    value: "null",
  };

  // Functions
  const handleChange = ({ target }: any) => {
    if (target.name === "category") {
      setCategory({
        ...category,
        [target.name]: target.value,
      });
    } else if (target.name === "brand") {
      setBrand({
        ...brand,
        [target.name]: target.value,
      });
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (category.category !== "") {
      navigate(`${str}?cat=${category.category}`);
    }
  };

  useEffect(() => {
    //fetchs
    dispatch(startCatFetchAll());
  }, []);

  return (
    <div className="sidebar-body container text-center">
      <div className="d-flex flex-column position-sticky">
        {user && (
          <>
            <div>
              <img
                style={{ width: "50px", borderRadius: "50%" }}
                src={user.picture}
                alt="profile picture"
              />
              <p className="m-0 mt-3">{user.username}</p>
            </div>
            <hr className="w-100 m-0 my-3" />
          </>
        )}
        {user.isAdmin && <h4>Admin Routes:</h4>}
        {user &&
          user.isAdmin &&
          adminRoutes.map((route: any) => (
            <div className="d-flex align-items-center justify-content-center mb-2">
              <i className={route.icon}></i>
              <NavLink style={{ marginLeft: "8px" }} to={route.url}>
                {route.name}
              </NavLink>
            </div>
          ))}
        <form onSubmit={handleSubmit}>
          <div className="dropdown-gender">
            <DropdownCategory
              dwName="category"
              options={categoryList}
              handleChange={handleChange}
              index={indexCat}
            />
          </div>
          <div className="d-flex">
            <button type="submit">Search</button>
          </div>
        </form>
        <button onClick={() => navigate("/products")}>Reset</button>
      </div>
    </div>
  );
};
