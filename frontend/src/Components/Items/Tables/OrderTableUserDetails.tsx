import { headerTableOrderUser } from "./imports";

import "./index.scss";

export const OrderTableUserDetails = ({ order }: any) => {
  return (
    <table className="table custom-table text-white">
      <thead>
        <tr>
          {headerTableOrderUser.map((item: string) => {
            if (item === "Id") {
              return (
                <th key={item} scope="col" className="d-md-table-cell d-none">
                  {item}
                </th>
              );
            } else if (item === "Img") {
              return (
                <th key={item} scope="col" className="d-md-table-cell d-none">
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
        {order.cart.length > 0 &&
          order.cart.map((product: any) => (
            <tr key={product._id}>
              <td
                className="d-md-table-cell d-none text-center align-middle"
                key={`${product._id}td`}
              >
                {product._id}
              </td>
              <td
                className="d-md-table-cell d-none text-center align-middle"
                key={product.image}
              >
                <img
                  className="img-cart"
                  src={product.image}
                  alt={product.image}
                />
              </td>
              <td className="text-center align-middle" key={product.name}>
                {product.name}
              </td>
              <td
                key={product.price}
                className="text-center align-middle"
              >{`$ ${product.price}`}</td>
              <td key={product.quantity} className="text-center align-middle">
                {product.quantity}
              </td>
              <td
                key={`${product.price}total`}
                className="text-center align-middle"
              >{`$${product.price * product.quantity}`}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
