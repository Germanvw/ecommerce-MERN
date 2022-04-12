import { MainButton } from "../Items/Buttons/MainButton";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/reducer/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ProductCard } from "../Items/Cards/ProductCard";
import { startProdFetchAll } from "../redux/actions/productActions";

export const Homepage = () => {
  const { productList }: any = useSelector((state: RootState) => state.prod);

  const dispatch = useDispatch();

  const [topSold, setTopSold] = useState([]);
  const [topRating, setTopRating] = useState([]);
  const [topNew, setTopNew] = useState([]);

  const navigate = useNavigate();

  const handleSold = (quantity: number) => {
    if (productList.length > 0) {
      let sorted = productList.sort((a: any, b: any) => {
        console.log(a, b);
        return b.totalSold - a.totalSold;
      });
      sorted = sorted.slice(0, quantity);
      setTopSold(sorted);
    }
  };

  const handleRating = (quantity: number) => {
    if (productList.length > 0) {
      let sorted = productList.sort((a: any, b: any) => {
        return b.rating - a.rating;
      });
      sorted = sorted.slice(0, quantity);
      setTopRating(sorted);
    }
  };

  const handleNew = (quantity: number) => {
    if (productList.length > 0) {
      let sorted = productList.sort((a: any, b: any) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      });
      sorted = sorted.slice(0, quantity);
      setTopNew(sorted);
    }
  };

  useEffect(() => {
    dispatch(startProdFetchAll("none", "none", true));
  }, []);

  useEffect(() => {
    handleSold(5);
    handleRating(5);
    handleNew(5);
  }, [productList]);
  console.log("topSold: ", topSold);
  console.log("topRating: ", topRating);
  console.log("topNew: ", topNew);
  return (
    <div className="page">
      <header>
        <div className="banner">
          <div className="container">
            <div className="col-md-3 col-sm-12 text-center">
              <h1>Ecommerce</h1>
              <div className="banner-button">
                <MainButton
                  handleClick={() => navigate("/products")}
                  title="Products"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="products-body">
          <div className="row m-0 w-100">
            <div className="col-md-12 body">
              <h3>Rating</h3>
              <div className="product-display d-flex justify-content-center">
                {topRating.map((product: any, index: any) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="row m-0 w-100">
            <div className="col-md-12 body">
              <h3>Sold</h3>
              <div className="product-display d-flex justify-content-center">
                {topSold.map((product: any, index: any) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="row m-0 w-100">
            <div className="col-md-12 body">
              <h3>New</h3>
              <div className="product-display d-flex justify-content-center">
                {topNew.map((product: any, index: any) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
