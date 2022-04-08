import { ReviewItem } from "./ReviewItem";

import "./styles.scss";

export const ReviewsList = ({ reviews }: any) => {
  return (
    <div className="review-section">
      <h4 className="mt-2">
        {reviews ? `${reviews.length} reviews` : "reviews"}
      </h4>
      {reviews?.map((review: any) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};
