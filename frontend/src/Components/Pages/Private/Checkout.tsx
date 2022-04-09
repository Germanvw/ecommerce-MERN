import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchToken } from "../../hooks/useFetch";
import { Dropdown } from "../../Items/Forms/Dropdown";
import { FormInput } from "../../Items/Forms/FormInput";
import { OrderTableUserDetails } from "../../Items/Tables/OrderTableUserDetails";
import { useDispatch } from "react-redux";
import { startOrderUpdate } from "../../redux/actions/OrderActions";
import { uiCloseModal, uiSetError } from "../../redux/actions/uiActions";
import {
  initErrorsCheckout,
  paymentAdressInfo,
  paymentOptions,
} from "./imports";
import { handleError } from "../../helpers/handleErrorInput";

export const Checkout = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state

  const [order, setOrder] = useState<any>("");
  const [payInfo, setPayInfo] = useState({
    payMethod: "Cash",
    payAdress: "",
  });
  const [errors, setErrors] = useState(initErrorsCheckout);

  useEffect(() => {
    getOrder();
  }, [id]);

  const getOrder = async () => {
    const req = await fetchToken(`orders/single/${id}`, {});
    const answ = await req.json();

    if (!answ.status) return navigate("/user");
    setOrder(answ.order);
  };

  const handleChange = ({ target }: any) => {
    setPayInfo({ ...payInfo, [target.name]: target.value });
    if (target.name === "payAdress") {
      handleError(target, errors, setErrors);
    }
  };

  const handleSubmit = () => {
    if (!errors.payAdress) {
      const newOrder = {
        ...order,
        paymentMethod: payInfo.payMethod,
        paymentAdress: payInfo.payAdress,
        status: "Paid",
        delivered: true,
      };
      dispatch(startOrderUpdate(newOrder));
      dispatch(uiCloseModal());
      navigate("/user");
    }
  };

  useEffect(() => {
    if (order) {
      if (order.paymentMethod !== "None") {
        dispatch(uiSetError("This order has already been paid for"));
        navigate("/user");
      } else if (order.status === "Cancelled") {
        dispatch(uiSetError("This order is cancelled"));
        navigate("/user");
      }
    }
  }, [order]);

  return (
    <div className="checkout-body">
      <div className="container">
        <div className="checkout-title pt-4">
          <h1>Checkout.</h1>
          <h3 className="my-4">Order ID: {order._id}</h3>
        </div>
        {order.cart && <OrderTableUserDetails order={order} />}
        <div className="extra-info">
          <div className="row m-0">
            <div className="col-md-6 d-flex flex-column align-items-center ">
              <Dropdown
                options={paymentOptions}
                handleChange={handleChange}
                dwName="payMethod"
              />
              <FormInput
                handleChange={handleChange}
                {...paymentAdressInfo}
                error={errors["payAdress"]}
              />
            </div>
            <div className="col-md-6 text-center">
              <div className="total my-2">Total: ${order.total}</div>
              <button onClick={handleSubmit}>Completar pedido</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
