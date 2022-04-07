import { useDispatch } from "react-redux";
import { confirmCancelOrder } from "../../hooks/useConfirmModal";
import { orderSetActive } from "../../redux/actions/OrderActions";
import { uiOpenModalOrder } from "../../redux/actions/uiActions";
import { headerTableUser } from "./imports";

import "./index.scss";

export const OrderTableUser = ({ orders }: any) => {
  const dispatch = useDispatch();

  const handleCancel = (_id: string) => {
    confirmCancelOrder(_id, dispatch);
  };

  const handleDisplay = (order: {}) => {
    dispatch(orderSetActive(order));
    dispatch(uiOpenModalOrder());
  };

  return (
    <table className="table custom-table">
      <thead>
        <tr>
          {headerTableUser.map((item: string) => {
            if (item === "Products") {
              return (
                <th scope="col" className="d-md-table-cell d-none" key={item}>
                  {item}
                </th>
              );
            } else if (item === "Delivered") {
              return (
                <th scope="col" className="d-md-table-cell d-none" key={item}>
                  {item}
                </th>
              );
            } else {
              return (
                <th scope="col" className="text-center" key={item}>
                  {item}
                </th>
              );
            }
          })}
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 &&
          orders.map((order: any) => (
            <tr key={order._id}>
              <td className="d-md-table-cell d-none text-center align-middle">
                {order.cart.length}
              </td>
              <td className="text-center align-middle">{`$${order.total}`}</td>
              <td className="d-md-table-cell d-none text-center align-middle">
                {order.delivered ? "Yes" : "No"}
              </td>
              <td
                className={`text-center align-middle ${
                  order.status === "Cancelled"
                    ? "cancelled"
                    : order.status === "Paid"
                    ? "paid"
                    : "pending"
                }`}
              >
                {order.status}
              </td>
              <td className="text-center align-middle">
                <button className="more" onClick={() => handleDisplay(order)}>
                  Details
                </button>
              </td>
              <td className="text-center align-middle">
                <button
                  className={`cancel ${
                    order.status === "Cancelled" && "disabled"
                  }`}
                  onClick={() => handleCancel(order._id)}
                  disabled={order.status === "Cancelled"}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};
