import { useDispatch } from "react-redux";
import { confirmChangeStateBrand } from "../../hooks/useConfirmModal";
import { brandSetActive } from "../../redux/actions/brandActions";
import { uiOpenModalBrand } from "../../redux/actions/uiActions";
import { IBrand } from "../../redux/reducer/brandReducer";
import { headerTableBrands } from "./imports";

import "./index.scss";

export const BrandTable = ({ brands }: any) => {
  const dispatch = useDispatch();

  const handleDelete = (_id: string) => {
    confirmChangeStateBrand(_id, dispatch);
  };

  const handleUpdate = (brand: IBrand) => {
    dispatch(brandSetActive(brand));
    dispatch(uiOpenModalBrand());
  };

  return (
    <table className="table custom-table">
      <thead>
        <tr>
          {headerTableBrands.map((item: string) => {
            if (item === "Id") {
              return (
                <th
                  key={item}
                  scope="col"
                  className="d-md-table-cell d-none  text-center"
                >
                  {item}
                </th>
              );
            } else if (item === "Img") {
              return (
                <th
                  key={item}
                  scope="col"
                  className="d-sm-table-cell d-none text-center"
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
        {brands.length > 0 &&
          brands.map((brand: IBrand) => (
            <tr key={brand._id}>
              <td className="d-md-table-cell d-none text-center align-middle">
                {brand._id}
              </td>
              <td className="d-sm-table-cell d-none text-center">
                <img src={brand.image} alt={brand.image} />
              </td>
              <td
                className={`align-middle text-center ${
                  !brand.active && "cancelled"
                }`}
              >
                {brand.name}
              </td>
              <td className="align-middle text-center">
                <button className="update" onClick={() => handleUpdate(brand)}>
                  Update
                </button>
              </td>
              <td className="align-middle  text-center">
                <button
                  className="delete"
                  onClick={() => handleDelete(brand._id!)}
                >
                  {brand.active ? "Desactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
