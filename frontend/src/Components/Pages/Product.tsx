import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchNoToken } from "../hooks/useFetch";
import { ReviewsList } from "../Items/Reviews/ReviewsList";
import { StarRating } from "../Items/Reviews/StarRating";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/reducer/rootReducer";
import { handleProductCart } from "../helpers/handleProductCart";
import { confirmDeleteProductCart } from "../hooks/useConfirmModal";

export const Product = () => {
  const { cart } = useSelector((state: RootState) => state.cart);
  const { id } = useParams();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  //States
  const [product, setProduct] = useState<any>("");
  const [quantity, setQuantity] = useState(0);

  //destructuring
  const { _id, name, category, brand, description, image, price, inStock } =
    product;

  const getProduct = async () => {
    const req = await fetchNoToken(`products/${id}`, {});
    const answ = await req.json();
    if (!answ.status) return navigate("/products");
    setProduct(answ.product);
  };

  const getRating = (reviews: any) => {
    let sum = 0;
    reviews.forEach((review: any) => {
      sum += review.stars;
    });
    return sum / reviews.length;
  };

  const handleQuantity = (q: number) => {
    let newQuantity;
    if (quantity + q === 0) {
      confirmDeleteProductCart(_id, dispatch);
    } else {
      newQuantity = Math.max(0, Math.min(quantity + q, product.inStock));
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
    }
  };

  const notFound = async () => {
    const found = await cart.find((item: any) => item._id === id);
    if (!found) return false;

    return true;
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      cart.filter((item: any) => {
        if (item._id === _id) {
          setQuantity(item.quantity);
        }
      });
    }
  }, [product]);

  useEffect(() => {
    notFound().then((res: any) => {
      if (res === false) {
        setQuantity(0);
      }
    });
  }, [cart]);
  return (
    <div className="page-product">
      <div className="container">
        <div className="back-button">
          <button onClick={() => navigate("/products")}>
            <i className="fa-solid fa-backward"></i>
          </button>
        </div>
        <div className="content row m-0">
          <div className="col-lg-5 col-md-12 col-sm-12 p-1 d-flex align-items-center">
            <img src={image} className="img-fluid" alt="product image"></img>
          </div>
          <div className="right col-lg-7 col-md-12 col-sm-12 p-1">
            <div className="d-flex justify-content-between">
              <div className="category-link">
                Category:
                {category && (
                  <span>
                    <Link to={`/products?cat=${category._id}`}>
                      {category.name}
                    </Link>
                  </span>
                )}
              </div>
              <div className="total-sold">
                <span>{product.totalSold} Sold</span>
              </div>
            </div>
            <h2 className="mt-4 mb-3">{name}</h2>
            <div className="d-flex align-items-center">
              <StarRating stars={product.rating} />
              <p className="m-0 mx-2">{product.totalReview} Reviews</p>
              <div className="branding">
                {brand && (
                  <span>
                    <Link to={`/products?brand=${brand._id}`}>
                      {brand.name}
                    </Link>
                  </span>
                )}
              </div>
            </div>
            <p className="my-5">{description}</p>
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
        <div className="row m-0 pb-4">
          {product.totalReview > 0 ? (
            <ReviewsList prodId={product._id} />
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
