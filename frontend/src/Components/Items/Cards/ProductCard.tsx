import { AddCartButton } from "../Buttons/AddCartButton";
import { StarRating } from "../Reviews/StarRating";
import { useNavigate } from "react-router-dom";

import "./index.scss";

export const ProductCard = ({ product, index }: any) => {
  const { name, image } = product;

  const navigation = useNavigate();

  const rating = 4.5;
  const amountReview = 25;

  return (
    // <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 my-2">
    //   <div className="product-card card mx-4 text-center px-2 py-2">
    //     <img src={image} alt={image} className="card-img-top" />
    //     <div className="card-body">
    //       <div className="rating d-flex justify-content-center align-items-center mt-2">
    //         <StarRating stars={rating} />
    //         <div className="reviews px-3">({amountReview})</div>
    //       </div>
    //       <div className="about">
    //         <h5>{name}</h5> <span>{`$ ${product.price}`}</span>
    //       </div>
    //       <div className="cart-button mt-1 px-2 d-flex justify-content-around align-items-center">
    //         <button onClick={() => navigation(`/products/${product._id}`)}>
    //           <i className="fa-solid fa-circle-info"></i>
    //         </button>
    //         <AddCartButton product={product} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div
      className="card product-card px-4 py-4 my-4 mx-4"
      style={{ width: "18rem" }}
    >
      <img src={product.image} className="card-img-top" alt="Product Image" />
      <div className="card-body text-center">
        <div className="rating d-flex justify-content-center align-items-center mt-2">
          <StarRating stars={rating} />
          <div className="reviews px-3">({amountReview})</div>
        </div>
        <h5>{name}</h5> <span>{`$ ${product.price}`}</span>
        <div className="cart-button mt-1 px-2 d-flex justify-content-around align-items-center">
          <button onClick={() => navigation(`/products/${product._id}`)}>
            <i className="fa-solid fa-circle-info"></i>
          </button>
          <AddCartButton product={product} />
        </div>
      </div>
    </div>
  );
};
