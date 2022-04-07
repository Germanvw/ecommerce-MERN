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
    <>
      <table className="table custom-table">
        <thead>
          <tr className="">
            {headerTableUser.map((item: string) => {
              console.log(item);
              if (item === "Products") {
                return (
                  <th
                    scope="col"
                    className="d-sm-none d-md-block d-none d-sm-block"
                  >
                    {item}
                  </th>
                );
              } else if (item === "Delivered") {
                return (
                  <th
                    scope="col"
                    className="d-sm-none d-md-block d-none d-sm-block"
                  >
                    {item}
                  </th>
                );
              } else {
                return <th scope="col">{item}</th>;
              }
            })}
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order: any) => (
              <tr key={order._id} className="">
                <td className="d-sm-none d-md-block d-none d-sm-block">
                  {order.cart.length}
                </td>
                <td>{`$${order.total}`}</td>
                <td className="d-sm-none d-md-block d-none d-sm-block">
                  {order.delivered ? "Yes" : "No"}
                </td>
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
                    Details
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
    </>
  );
};
