import { useState } from "react";
import { Star } from "./Star";

const createArray = (length) => [...Array(length)];

export const StarRating = ({ totalStars = 5, tour_id, id }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  return (
    <div className="d-flex" aria-label="iconos de estrellas para valoración">
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => {
            setSelectedStars(i + 1);
          }}
          setSelectedStars={setSelectedStars}
          tour_id={tour_id}
          id={id}
        />
      ))}
    </div>
  );
};
