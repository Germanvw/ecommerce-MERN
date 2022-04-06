import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNoToken } from "../hooks/useFetch";
import { ReviewsList } from "../Items/Reviews/ReviewsList";
import { StarRating } from "../Items/Reviews/StarRating";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer/rootReducer";
import { handleProductCart } from "../helpers/handleProductCart";

export const Product = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const { id } = useParams();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const reviews = [
    {
      _id: "1",
      uid: "6247e9801ef88052fd5a5182",
      comment: "Nice product",
      rating: 5,
    },
    {
      _id: "2",
      uid: "6248a0f03f136db4eab1d83e",
      comment: "I really like this product",
      rating: 2,
    },
    {
      _id: "3",
      uid: "6249d9c182727434a3f1bd8d",
      comment: "Could be better",
      rating: 2,
    },
  ];

  //States
  const [product, setProduct] = useState<any>("");
  const [rating, setRating] = useState(2);
  const [quantity, setQuantity] = useState(0);
  //destructuring
  const { _id, name, category, description, image, price, inStock } = product;

  const getProduct = async () => {
    const req = await fetchNoToken(`products/${id}`, {});
    const answ = await req.json();

    if (!answ.status) return navigate("/products");
    setProduct(answ.product);
  };

  const getRating = (reviews: any) => {
    let sum = 0;
    reviews.forEach((review: any) => {
      sum += review.rating;
    });
    return sum / reviews.length;
  };

  const handleQuantity = (q: number) => {
    const newQuantity = Math.max(0, Math.min(quantity + q, product.inStock));
    setQuantity(newQuantity);
    const productCart = {
      image,
      inStock,
      name,
      price,
      quantity: newQuantity,
      _id,
    };

    handleProductCart(productCart, cart, dispatch);
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      // get reviews
      setRating(getRating(reviews));

      // get current in cart
      cart.filter((item: any) => {
        if (item._id === _id) {
          setQuantity(item.quantity);
        }
      });
    }
  }, [product]);

  //el stock lo tengo

  return (
    <div className="page-product">
      <div className="container">
        <div className="back-button">
          <button onClick={() => navigate("/products")}>
            <i className="fa-solid fa-backward"></i>
          </button>
        </div>
        <div className="content row m-0">
          <div className="col-lg-5 col-md-4 col-sm-12 p-1">
            <img src={image} alt="product image"></img>
          </div>
          <div className="right col-lg-7 col-md-8 col-sm-12 p-1">
            <div className="category-link">
              Category: <span>{category}</span>
            </div>
            <h2 className="mt-4 mb-3">{name}</h2>
            <StarRating stars={rating} />
            <p>{rating}</p>
            <p className="my-3">{description}</p>
            <h4>Price: ${price}</h4>
            <div className="product mt-4">
              {product.inStock > 0 ? (
                <p className="success">{inStock} In stock</p>
              ) : (
                <p className="error">No stock</p>
              )}
            </div>
            <div className="handler">
              <div className="quantity d-flex align-items-center">
                <button
                  onClick={() => handleQuantity(-1)}
                  className={`${
                    (quantity === 0 || inStock === 0) && "disabled"
                  }`}
                  disabled={quantity === 0 || inStock === 0}
                >
                  -
                </button>
                <p className="m-0 mx-3">{quantity}</p>
                <button
                  onClick={() => handleQuantity(1)}
                  className={`${
                    (quantity === inStock || inStock === 0) && "disabled"
                  }`}
                  disabled={quantity === inStock || inStock === 0}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row m-0">
          {reviews.length > 0 ? (
            <ReviewsList reviews={reviews} />
          ) : (
            <div>
              <p>No reviews found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
