import { StarRating } from "./StarRating";
export const ReviewItem = ({ review }: any) => {
  const img =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj3be0NvJcT_uyHSuHN5t47-D2orRO656BqMwAZnFpc7FpZhc5bbteQPna5I46SuKqe0U&usqp=CAU";

  const username = "username";
  return (
    <div className="review py-2 px-3 ">
      <div className="row m-0">
        <img src={img} alt="avatar"></img>
        <div className="col-md-2 sm-12 px-5">
          <p className="username">{username}</p>
          <div>
            <StarRating stars={review.rating} />
          </div>
        </div>
        <div className="col-md-10 sm-12 ">
          <p className="comment-label">Comment:</p>
          <p>{review.comment}</p>
        </div>
      </div>
    </div>
  );
};
