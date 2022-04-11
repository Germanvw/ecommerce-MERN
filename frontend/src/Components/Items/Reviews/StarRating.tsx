import { useState, useEffect } from "react";
export const StarRating = ({ stars }: any) => {
  const [array, setArray] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    const answ = getStars(stars);
    if (answ && answ!.length > 0) {
      setArray(answ!);
    }
  }, [stars]);

  return (
    <div className="d-flex justify-content-center align-items-center">
      {array?.map((star, index) => {
        if (star === 100 || star === 0) {
          return (
            <i
              className="fa-solid fa-star"
              style={{ color: star === 100 ? "gold" : "gray" }}
              key={index}
            ></i>
          );
        } else {
          return (
            <i
              className="fa-solid  fa-star-half-stroke"
              style={{ color: "gold" }}
              key={index}
            ></i>
          );
        }
      })}
    </div>
  );
};

const getStars = (stars: any) => {
  switch (parseFloat(stars)) {
    case 0.0:
      return [0, 0, 0, 0, 0];
    case 0.5:
      return [50, 0, 0, 0, 0];
    case 1.0:
      return [100, 0, 0, 0, 0];
    case 1.5:
      return [100, 50, 0, 0, 0];
    case 2.0:
      return [100, 100, 0, 0, 0];
    case 2.5:
      return [100, 100, 50, 0, 0];
    case 3.0:
      return [100, 100, 100, 0, 0];
    case 3.5:
      return [100, 100, 100, 50, 0];
    case 4.0:
      return [100, 100, 100, 100, 0];
    case 4.5:
      return [100, 100, 100, 100, 50];
    case 5.0:
      return [100, 100, 100, 100, 100];
  }
};
