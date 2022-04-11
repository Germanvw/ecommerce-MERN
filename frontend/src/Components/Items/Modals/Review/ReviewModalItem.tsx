import { useEffect, useState } from "react";
import { fireModal } from "../../../hooks/useModal";
import { StarsInput } from "./StarsInput";
import { useDispatch, useSelector } from "react-redux";
import { startReviewProduct } from "../../../redux/actions/productActions";
import { StarRating } from "../../Reviews/StarRating";
import { RootState } from "../../../redux/reducer/rootReducer";
import { fetchNoToken } from "../../../hooks/useFetch";

const ReviewModalItem = ({ cartItem }: { cartItem: any }) => {
  const { active } = useSelector((state: RootState) => state.order);

  const dispatch = useDispatch();
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState({ _id: "None", stars: 0, comment: "" });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (review.comment.trim().length < 9 || stars <= 0) {
      fireModal(
        "Error",
        "Please fill out the form correctly.",
        "error",
        dispatch
      );
    } else {
      dispatch(startReviewProduct(cartItem, stars, review.comment, active._id));
    }
  };

  const handleChange = ({ target }: any) => {
    setReview({ ...review, [target.name]: target.value });
  };

  const fetchReview = async () => {
    if (cartItem.review !== "None") {
      const req = await fetchNoToken(
        `review/single/${cartItem.review._id}`,
        {}
      );
      const answ = await req.json();
      return answ;
    }
  };

  useEffect(() => {
    fetchReview().then((res) => {
      if (res && res.status) {
        setReview({
          _id: res.review._id,
          stars: res.review.stars,
          comment: res.review.comment,
        });
      }
    });
  }, []);

  return (
    <div className="review-item-modal my-3 p-2">
      <form className="m-0" onSubmit={handleSubmit}>
        <div className="row m-0 w-100">
          <div className="col-md-6">
            <div className="row m-0 w-100">
              <div className="col-md-6">
                <img
                  src={cartItem.image}
                  style={{ height: "100px", width: "auto" }}
                />
              </div>
              <div className="col-md-6 d-flex align-items-center">
                {cartItem.name}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row m-0 w-100 h-100">
              {review._id === "None" ? (
                <StarsInput
                  stars={[0, 0, 0, 0, 0]}
                  value={stars}
                  setValue={setStars}
                />
              ) : (
                <StarRating stars={review.stars} />
              )}
            </div>
          </div>
        </div>
        <div className="row m-0 w-100">
          {review._id === "None" ? (
            <textarea
              value={review.comment}
              name="comment"
              onChange={handleChange}
              className="mt-3"
            />
          ) : (
            <textarea value={review.comment} className="mt-3" readOnly={true} />
          )}
          {review._id === "None" && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
};

export default ReviewModalItem;
