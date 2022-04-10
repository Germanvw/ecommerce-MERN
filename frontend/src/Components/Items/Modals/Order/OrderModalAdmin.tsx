import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import { customProductStyles } from "../Product/imports";
import { orderClearActive } from "../../../redux/actions/OrderActions";
import { OrderTableUserDetails } from "../../Tables/OrderTableUserDetails";

import Modal from "react-modal";

import "./../styles.scss";
import { useNavigate } from "react-router-dom";

export const OrderModalAdmin = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { active } = useSelector((state: RootState) => state.order);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(orderClearActive());
  };

  // Effects
  if (!active) return <></>;
  console.log(active);
  return (
    <Modal
      isOpen={modal.order}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className={`${darkMode ? "modal-d" : "modal-l"} modal-order-user modal-x`}
      style={customProductStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>Order Details.</h1>
        <h3>ID: {active._id}</h3>
        <h5>User: {active.uid}</h5>
        <OrderTableUserDetails order={active} />
        <div className="d-flex justify-content-around w-100">
          <div className="row m-0 w-100 text-center">
            <div className="col-md-6 d-flex justify-content-between">
              <div className="payment-method">
                Payment:
                <p
                  className={`${
                    active.paymentMethod === "None" && "cancelled"
                  }`}
                >
                  {active.paymentMethod}
                </p>
              </div>
              <div className="status">
                Status:
                <p
                  className={`${
                    active.status === "Cancelled"
                      ? "cancelled"
                      : active.status === "Paid"
                      ? "paid"
                      : "pending"
                  }`}
                >
                  {active.status}
                </p>
              </div>
              <div className="delivered">
                Delivered:
                <p
                  className={`delivered ${
                    active.delivered ? "paid" : "cancelled"
                  }`}
                >
                  {active.delivered ? "Yes" : "No"}
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="total">Total: ${active.total}</div>
            </div>
            <button onClick={closeModal}>Cerrar</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
