import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchToken } from "../../hooks/useFetch";
import { Dropdown } from "../../Items/Forms/Dropdown";
import { FormInput } from "../../Items/Forms/FormInput";
import { OrderTableUserDetails } from "../../Items/Tables/OrderTableUserDetails";
import { useDispatch } from "react-redux";
import { startOrderUpdate } from "../../redux/actions/OrderActions";
import { uiSetError } from "../../redux/actions/uiActions";

const paymentOptions = [
  { name: "Cash", value: "Cash" },
  { name: "Credit Card", value: "Credit Card" },
  { name: "Paypal", value: "Paypal" },
  { name: "Bitcoin", value: "Bitcoin" },
];

const paymentAdressInfo = {
  placeholder: "Adress",
  type: "text",
  name: "payAdress",
};

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

  useEffect(() => {
    getOrder();
  }, [id]);

  const getOrder = async () => {
    const req = await fetchToken(`orders/${id}`, {});
    const answ = await req.json();
    if (!answ.status) return navigate("/user");
    setOrder(answ.order);
  };

  const handleChange = ({ target }: any) => {
    setPayInfo({ ...payInfo, [target.name]: target.value });
  };

  const handleSubmit = () => {
    if (payInfo.payAdress.trim().length > 0) {
      const newOrder = {
        ...order,
        paymentMethod: payInfo.payMethod,
        paymentAdress: payInfo.payAdress,
        rated: null,
      };
      dispatch(startOrderUpdate(newOrder));
      navigate("/user");
    }
  };

  useEffect(() => {
    if (order) {
      if (order.paymentMethod !== "None") {
        dispatch(uiSetError("This order has already been paid for"));
      } else if (order.status === "Cancelled") {
        dispatch(uiSetError("This order is cancelled"));
      }
      navigate("/user");
    }
  }, [order]);

  return (
    <div className="checkout">
      <div className="checkout-title">
        <h1>Checkout.</h1>
        <h3>Order Identificer: {order._id}</h3>
        <h2>Products </h2>
      </div>
      {order.cart && <OrderTableUserDetails order={order} />}
      <div className="extra-info">
        <div className="left">
          <div className="payment-method">
            <label>Payment Method: </label>
            <Dropdown
              options={paymentOptions}
              handleChange={handleChange}
              dwName="payMethod"
            />
          </div>
          <div className="payment-adress">
            <label>Adress: </label>
            <FormInput handleChange={handleChange} {...paymentAdressInfo} />
          </div>
        </div>
        <div className="right">
          <div className="total">Total: ${order.total}</div>
          <button onClick={handleSubmit}>Completar pedido</button>
        </div>
      </div>
    </div>
  );
};
