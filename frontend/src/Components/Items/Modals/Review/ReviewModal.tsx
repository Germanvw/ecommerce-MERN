import { useDispatch, useSelector } from "react-redux";

import Modal from "react-modal";

import "./../styles.scss";
import { RootState } from "../../../redux/reducer/rootReducer";
import { uiCloseModal } from "../../../redux/actions/uiActions";
import {
  IProductCart,
  orderClearActive,
} from "../../../redux/actions/OrderActions";
import { customProductStyles } from "../Product/imports";
import ReviewModalItem from "./ReviewModalItem";
import { ReviewModalList } from "./ReviewModalList";

export const ReviewModal = () => {
  const { modal, darkMode } = useSelector((state: RootState) => state.ui);
  const { active } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();
  //Modal handling
  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(orderClearActive());
  };
  // Effects
  if (!active) return <></>;
  return (
    <Modal
      isOpen={modal.review}
      onRequestClose={closeModal}
      closeTimeoutMS={200}
      className={`${darkMode ? "modal-d" : "modal-l"} modal-order-user modal-x`}
      style={customProductStyles}
      overlayClassName="modal-background"
      ariaHideApp={false}
    >
      <div className="modal-bg" theme-color={darkMode ? "dark" : "light"}>
        <h1>Review products.</h1>
        <h3>Order: {active._id}</h3>
        <div className="d-flex justify-content-around w-100">
          <div className="row m-0 w-100 text-center">
            <ReviewModalList list={active.cart} orderId={active._id} />
          </div>
        </div>
      </div>
    </Modal>
  );
};
