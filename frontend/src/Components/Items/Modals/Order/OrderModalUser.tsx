import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uiCloseModal } from "../../../redux/actions/uiActions";
import { RootState } from "../../../redux/reducer/rootReducer";
import { customProductStyles } from "../Product/imports";
import { orderClearActive } from "../../../redux/actions/OrderActions";

import Modal from "react-modal";
import { OrderTableUserDetails } from "../../Tables/OrderTableUserDetails";
export const OrderModalUser = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { active } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();

  // States

  // Effects

  // Functions

  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(orderClearActive());
  };

  // Effects
  if (!active) return <p>Loading</p>;
  return (
    <Modal
      isOpen={modal.order}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className="modal modal-order-user-detail"
      style={customProductStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>Order Details.</h1>
        <h3>ID: {active._id}</h3>
        <OrderTableUserDetails order={active} />
        <div className="dropdown-category"></div>
        <button onClick={closeModal}>Cerrar</button>
      </div>
    </Modal>
  );
};
