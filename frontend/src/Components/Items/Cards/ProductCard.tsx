import { AddCartButton } from "../Buttons/AddCartButton";
import { StarRating } from "../Reviews/StarRating";
import { useNavigate } from "react-router-dom";
import { fetchNoToken } from "../../hooks/useFetch";
import { useEffect, useState } from "react";

import "./index.scss";

export const ProductCard = ({ product, index }: any) => {
  const navigate = useNavigate();

  const { name, brand } = product;

  const [currentProduct, setCurrentProduct] = useState(null);

  const getProduct = async () => {
    const req = await fetchNoToken(`products/${product._id}`, {});
    const answ = await req.json();

    if (!answ.status) return navigate("/products");
    setCurrentProduct(answ.product);
  };

  useEffect(() => {
    getProduct();
  }, [product]);

  return (
    <div
      className="card product-card px-4 py-4 my-4 mx-4"
      style={{ width: "18rem" }}
    >
      <div className="branding d-flex justify-content-center">
        <div className="brand-text text-center">{brand.name}</div>
        <img src={product.image} className="card-img-top" alt="Product Image" />
      </div>
      <div className="card-body text-center pt-0">
        <div className="rating d-flex justify-content-center align-items-center">
          <StarRating stars={product.rating} />
          <div className="reviews px-1">({product.totalReview})</div>
        </div>
        <div className="total-sold">
          <span>{product.totalSold} Sold</span>
        </div>
        <h5 className="pt-2">{name}</h5> <span>{`$ ${product.price}`}</span>
        <div className="cart-button mt-1 px-2 d-flex justify-content-around align-items-center">
          <button onClick={() => navigate(`/products/${product._id}`)}>
            <i className="fa-solid fa-circle-info"></i>
          </button>
          <AddCartButton product={product} />
        </div>
      </div>
    </div>
  );
};
