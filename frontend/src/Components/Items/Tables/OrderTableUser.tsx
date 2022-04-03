import { useDispatch, useSelector } from "react-redux";
import { confirmCancelOrder } from "../../hooks/useConfirmModal";
import { orderSetActive } from "../../redux/actions/OrderActions";
import { uiOpenModalOrder } from "../../redux/actions/uiActions";

import "./index.scss";

export const OrderTableUser = ({ orders }: any) => {
  const dispatch = useDispatch();
  const header = [
    "Id",
    "Method",
    "Products",
    "Total",
    "Delivered",
    "Status",
    "See Details",
    "Cancel",
  ];
  const handleCancel = (_id: string) => {
    confirmCancelOrder(_id, dispatch);
  };

  // const handleUpdate = (order: {}) => {
  //   dispatch(orderSetActive(order));
  //   dispatch(uiOpenModalProduct());
  // };

  const handleDisplay = (order: {}) => {
    dispatch(orderSetActive(order));
    dispatch(uiOpenModalOrder());
  };
  return (
    <table className="table-order-user">
      <thead>
        <tr>
          {header.map((item: string) => (
            <th key={item}>{item}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders.length > 0 &&
          orders.map((order: any) => (
            <tr key={order._id}>
              <td>{`${order._id.slice(0, 7)}...`}</td>
              <td>{order.paymentMethod ? order.paymentMethod : "None"}</td>
              <td>{order.cart.length}</td>
              <td>{`$ ${order.total}`}</td>
              <td>{order.delivered ? "Yes" : "No"}</td>
              <td
                className={
                  order.status === "Cancelled"
                    ? "cancelled"
                    : order.status === "Paid"
                    ? "paid"
                    : "pending"
                }
              >
                {order.status}
              </td>
              <td>
                <button className="more" onClick={() => handleDisplay(order)}>
                  Show More
                </button>
              </td>
              <td>
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
