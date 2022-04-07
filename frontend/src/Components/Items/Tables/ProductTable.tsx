import { useDispatch } from "react-redux";
import { confirmDeleteProduct } from "../../hooks/useConfirmModal";
import { prodSetActive } from "../../redux/actions/productActions";
import { uiOpenModalProduct } from "../../redux/actions/uiActions";
import { headerTableProducts } from "./imports";

import "./index.scss";

export const ProductTable = ({ products }: any) => {
  const dispatch = useDispatch();

  const handleDelete = (_id: string) => {
    confirmDeleteProduct(_id, dispatch);
  };

  const handleUpdate = (product: {}) => {
    dispatch(prodSetActive(product));
    dispatch(uiOpenModalProduct());
  };
  const handleDisplay = (product: {}) => {
    dispatch(prodSetActive(product));
    dispatch(uiOpenModalProduct());
  };
  return (
    <table className="table custom-table">
      <thead>
        <tr>
          {headerTableProducts.map((item: string) => {
            if (item === "Img") {
              return (
                <th
                  key={item}
                  scope="col"
                  className="text-center d-none d-md-block"
                >
                  {item}
                </th>
              );
            } else if (item === "Price") {
              return (
                <th
                  key={item}
                  scope="col"
                  className="d-none d-sm-table-cell text-center align-middle"
                >
                  {item}
                </th>
              );
            } else if (item === "In Stock") {
              return (
                <th
                  key={item}
                  scope="col"
                  className="d-none d-md-table-cell text-center"
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
        {products.length > 0 &&
          products.map((product: any) => (
            <tr key={product._id}>
              <td className="d-none d-md-block text-center">
                <img src={product.image} alt={product.image} />
              </td>
              <td className="align-middle text-center">{product.name}</td>
              <td className="d-none d-sm-table-cell align-middle text-center">{`$ ${product.price}`}</td>
              <td className="d-none d-md-table-cell align-middle text-center">
                {product.inStock}
              </td>
              <td className="align-middle text-center">
                <button className="more" onClick={() => handleDisplay(product)}>
                  Show More
                </button>
              </td>
              <td className="align-middle text-center">
                <button
                  className="update"
                  onClick={() => handleUpdate(product)}
                >
                  Update
                </button>
              </td>
              <td className="align-middle text-center">
                <button
                  className="delete"
                  onClick={() => handleDelete(product._id)}
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
