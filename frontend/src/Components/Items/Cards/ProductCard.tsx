import { AddCartButton } from "../Buttons/AddCartButton";
import { StarRating } from "../Reviews/StarRating";
import { useNavigate } from "react-router-dom";
import { fetchNoToken } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { getRating } from "../../helpers/handleGetRating";
import { fetchRatings } from "../../helpers/handleFetchRatings";

import "./index.scss";

export const ProductCard = ({ product, index }: any) => {
  const navigate = useNavigate();

  const { name, image } = product;

  const [currentProduct, setCurrentProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [ratingList, setRatingList] = useState([]);

  const getProduct = async () => {
    const req = await fetchNoToken(`products/${product._id}`, {});
    const answ = await req.json();

    if (!answ.status) return navigate("/products");
    setCurrentProduct(answ.product);
  };

  const handleReq = async () => {
    const r = await fetchRatings(product._id);
    setRatingList(r);
  };

  useEffect(() => {
    getProduct();
    handleReq();
  }, [product]);

  useEffect(() => {
    if (ratingList.length > 0) {
      const current = getRating(ratingList);
      setRating(Math.floor(current));
    }
  }, [ratingList]);

  return (
    <div
      className="card product-card px-4 py-4 my-4 mx-4"
      style={{ width: "18rem" }}
    >
      <img src={product.image} className="card-img-top" alt="Product Image" />
      <div className="card-body text-center">
        <div className="rating d-flex justify-content-center align-items-center mt-2">
          <StarRating stars={rating} />
          <div className="reviews px-3">({ratingList.length})</div>
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
