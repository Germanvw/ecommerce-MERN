import { Dispatch, SetStateAction, useState } from "react";

interface IStarRating {
  stars: number[];
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

export const StarsInput = ({ stars, value, setValue }: IStarRating) => {
  const handleClick = (n: number) => {
    if (n === value) {
      setValue(-1);
    } else {
      setValue(n);
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center">
      {stars?.map((_, index) => {
        return (
          <i
            className="fa-solid fa-star"
            style={{ color: value > index ? "gold" : "gray" }}
            key={index}
            onClick={() => handleClick(index + 1)}
          ></i>
        );
      })}
    </div>
  );
};
