import React, { FC, useState } from "react";
import { ITask } from "../../models/ITask";
import "./StarRating.css";

interface Props {
  todo: ITask;
  key: number;
}

const StarRating: FC<Props> = ({ todo, key }) => {
  const [rating, setRating] = useState(todo.importance);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;