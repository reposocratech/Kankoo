import { useState, useEffect } from "react";
import axios from "axios";

export const Star = ({
  setSelectedStars,
  selected = false,
  onSelect = (f) => f,
  tour_id,
  id,
}) => {
  const [localStorageKey, setLocalStorageKey] = useState(
    `rating_${tour_id}_${id}`
  );

  // useEffect(() => {
  //   const storedRating = localStorage.getItem(localStorageKey);
  //   if (storedRating !== null) {
  //     setSelectedStars(parseInt(storedRating, 10));
  //   }
  // }, [localStorageKey, setSelectedStars]);

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
      // localStorage.setItem(localStorageKey, prevSelectedStars.toString());

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
