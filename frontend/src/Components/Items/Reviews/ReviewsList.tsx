import { useEffect, useState } from "react";
import { ReviewItem } from "./ReviewItem";

import "./styles.scss";

// export interface ReviewProps {
//   _id: string;
//   uid: string;
//   comment: string;
//   rating: number;
// }

export const ReviewsList = ({ reviews }: any) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    //get User
  }, []);
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
