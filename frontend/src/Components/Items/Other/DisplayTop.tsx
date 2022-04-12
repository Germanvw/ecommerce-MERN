import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startProdFetchAll } from "../../redux/actions/productActions";
import { RootState } from "../../redux/reducer/rootReducer";
import { ProductCard } from "../Cards/ProductCard";

export const DisplayTop = () => {
  const { productList }: any = useSelector((state: RootState) => state.prod);

  const dispatch = useDispatch();

  const [topSold, setTopSold] = useState([]);
  const [topRating, setTopRating] = useState([]);
  const [topNew, setTopNew] = useState([]);

  const handleSold = (quantity: number) => {
    if (productList.length > 0) {
      let sorted = productList.sort((a: any, b: any) => {
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
  return (
    <div className="products-body pt-4">
      <div className="row m-0 w-100">
        <h3 className="text-center">Top Rated</h3>
        <div className="col-md-12 body">
          <div className="product-display d-flex justify-content-center">
            {topRating.map((product: any, index: any) => (
              <ProductCard product={product} key={product._id} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="row m-0 w-100">
        <div className="col-md-12 body">
          <h3 className="text-center">Top Sold</h3>
          <div className="product-display d-flex justify-content-center">
            {topSold.map((product: any, index: any) => (
              <ProductCard product={product} key={product._id} index={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="row m-0 w-100">
        <h3 className="text-center">Newest</h3>
        <div className="col-md-12 body">
          <div className="product-display d-flex justify-content-center">
            {topNew.map((product: any, index: any) => (
              <ProductCard product={product} key={product._id} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
