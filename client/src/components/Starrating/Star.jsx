import { useState } from "react";
import axios from "axios";

export const Star = ({
  setSelectedStars,
  selected = false,
  onSelect = (f) => f,
  tour_id,
  id,
}) => {
  const handleClickRating = () => {
    onSelect();
    setSelectedStars((prevSelectedStars) => {
      console.log("COSILLAS", prevSelectedStars, tour_id, id);

      axios
        .post(`http://localhost:3000/tours/${tour_id}/rating/${id}`, {
          prevSelectedStars,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });

      return prevSelectedStars;
    });
  };

  return (
    <span
      className={selected ? "starSelected" : "starNotSelected"}
      aria-label="icono de estrella de valoración"
      onClick={handleClickRating}
    >
      &#9733;
    </span>
  );
};
