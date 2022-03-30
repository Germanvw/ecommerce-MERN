import { useDispatch } from "react-redux";
import { confirmDeleteProduct } from "../../hooks/useConfirmModal";
import { prodSetActive } from "../../redux/actions/productActions";
import { uiOpenModalProduct } from "../../redux/actions/uiActions";

import "./index.scss";

export const ProductTable = ({ products }: any) => {
  const dispatch = useDispatch();
  const header = [
    "Id",
    "Img",
    "Name",
    "Price",
    "In Stock",
    "More Info",
    "Update",
    "Delete",
  ];
  const handleDelete = (_id: string) => {
    confirmDeleteProduct(_id, dispatch);
  };

  const handleUpdate = (category: {}) => {
    dispatch(prodSetActive(category));
    dispatch(uiOpenModalProduct());
  };
  const handleDisplay = (category: {}) => {
    dispatch(prodSetActive(category));
    dispatch(uiOpenModalProduct());
  };
  return (
    <table className="table-product">
      <thead>
        <tr>
          {header.map((item: string) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.length > 0 &&
          products.map((product: any) => (
            <tr key={product._id}>
              <td>{`${product._id.slice(0, 10)}...`}</td>
              <td>
                <img src={product.image} alt={product.image} />
              </td>
              <td>{product.name}</td>
              <td>{`$ ${product.price}`}</td>
              <td>{product.inStock}</td>
              <td>
                <button className="more" onClick={() => handleDisplay(product)}>
                  Show More
                </button>
              </td>
              <td>
                <button
                  className="update"
                  onClick={() => handleUpdate(product)}
                >
                  Update
                </button>
              </td>
              <td>
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
