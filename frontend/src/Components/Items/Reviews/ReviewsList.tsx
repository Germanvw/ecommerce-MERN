import { useEffect, useState } from "react";
import { fetchRatings } from "../../helpers/handleFetchRatings";
import { ReviewItem } from "./ReviewItem";

import "./styles.scss";

export const ReviewsList = ({ prodId }: { prodId: string }) => {
  const [list, setList] = useState([]);
  const handleReq = async () => {
    const r = await fetchRatings(prodId);
    setList(r);
  };

  useEffect(() => {
    handleReq();
  }, [list]);
  return (
    <div className="review-section">
      <h4 className="mt-2">{list ? `${list.length} reviews` : "reviews"}</h4>
      {list?.map((review: any) => (
        <ReviewItem key={review._id} review={review} />
      ))}
    </div>
  );
};
