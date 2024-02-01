import { useState, useEffect } from "react";
import axios from "axios";

export const Star = ({
  setSelectedStars,
  selected = false,
  onSelect = (f) => f,
  tour_id,
  id,
  setMsg,
  user,
}) => {
  const handleClickRating = () => {
    onSelect();
    setSelectedStars((prevSelectedStars) => {
      if (user && user.user_type != 1) {
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
      } else {
        setMsg("Regístrate como usuario para valorar una guía");
      }
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
