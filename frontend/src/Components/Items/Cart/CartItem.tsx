import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { confirmDeleteProductCart } from "../../hooks/useConfirmModal";
import { fetchNoToken } from "../../hooks/useFetch";
import { startCartUpdate } from "../../redux/actions/cartActions";

import "./index.scss";
export const CartItem = ({ product }: any) => {
  const dispatch = useDispatch();
  const { _id, name, image, price, quantity } = product;

  const [stock, setStock] = useState(0);

  const handleStock = async () => {
    const req = await fetchNoToken(`products/${_id}`, {});
    const answ = await req.json();
    if (answ.status) {
      return answ.product.inStock;
    }
  };
  const handleQuantity = (q: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + q, stock));
    product.quantity = newQuantity;

    dispatch(startCartUpdate(product));
  };

  const handleDelete = (_id: string) => {
    confirmDeleteProductCart(_id, dispatch);
  };

  useEffect(() => {
    handleStock().then((amount: number) => {
      setStock(amount);
    });
  }, [product]);

  return (
    <div className="cart-item-body py-4 px-4 mb-3 ">
      <div className="row m-0 d-flex justify-content-between  align-items-center">
        <div className="col-md-4 d-flex justify-content-center">
          <div className="img-container">
            <img src={image} alt={image}></img>
          </div>
        </div>
        <div className="col-md-8">
          <div className="row m-0">
            <div className="col-md-3 d-flex justify-content-center align-items-center">
              <div className="cart-item-title">
                <Link className="item-name" to={`products/${_id}`}>
                  {name}
                </Link>
              </div>
            </div>
            <div className="col-md-9 my-3">
              <div className="row m-0">
                <div className="col-md-6">
                  <div className="handler ">
                    <div className="quantity d-flex justify-content-center align-items-center">
                      <button
                        onClick={() => handleQuantity(-1)}
                        className={`${
                          (quantity === 1 || stock === 0) && "disabled"
                        }`}
                      >
                        -
                      </button>
                      <p className="m-0 mx-3">{product.quantity}</p>
                      <button
                        onClick={() => handleQuantity(1)}
                        className={`${
                          (quantity === stock || stock === 0) && "disabled"
                        }`}
                      >
                        +
                      </button>
                    </div>
                    <p className="d-flex justify-content-center mt-2">
                      In Stock: {stock}
                    </p>
                  </div>
                </div>
                <div className="col-md-6 ">
                  <div className="row m-0">
                    <div className="col-lg-6">
                      <div className="price d-flex justify-content-center align-items-center">
                        ${price}
                      </div>
                    </div>
                    <div className="col-lg-6 ">
                      <div className="mt-2 d-flex justify-content-center align-items-center">
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(_id)}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
