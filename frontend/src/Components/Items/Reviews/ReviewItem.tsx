import { useState, useEffect } from "react";
import { fetchNoToken } from "../../hooks/useFetch";
import { StarRating } from "./StarRating";

export const ReviewItem = ({ review }: any) => {
  const [user, setUser] = useState({
    username: null,
    picture: "",
    uid: null,
  });

  const { username, picture, uid } = user;
  const { stars } = review;

  const [date, setDate] = useState("");

  const getUser = async () => {
    const req = await fetchNoToken(`users/info/${review.uid}`, {});
    const answ = await req.json();
    if (!answ.status) return;
    setUser(answ.user);
  };

  useEffect(() => {
    getUser();
    const date = new Date(review.createdAt);
    setDate(date.toLocaleDateString());
  }, []);

  return (
    <div className="review px-3 " key={uid}>
      <div className="row m-0 py-4">
        <img src={picture} alt="avatar"></img>
        <div className="col-md-2 sm-12 px-5">
          <p className="username">{username}</p>
          <div>
            <StarRating stars={stars} />
          </div>
        </div>
        <div className="col-md-8 sm-12 ">
          <p className="comment-label"></p>
          <p>{review.comment}</p>
        </div>
        <div className="col-md-2 sm-12 ">
          <p>{date}</p>
        </div>
      </div>
    </div>
  );
};
