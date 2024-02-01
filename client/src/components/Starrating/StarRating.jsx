import { useState } from "react";
import { Star } from "./Star";
import { useEffect } from "react";
import axios from "axios";

const createArray = (length) => [...Array(length)];

export const StarRating = ({ totalStars = 5, tour_id, id, setMsg, user }) => {
  const [selectedStars, setSelectedStars] = useState(0);

  console.log("totalllll", totalStars);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/tours/getonerate/${tour_id}/${id}`)
      .then((res) => {
        setSelectedStars(res.data[0].rating);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

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
          setMsg={setMsg}
          user={user}
        />
      ))}
    </div>
  );
};
