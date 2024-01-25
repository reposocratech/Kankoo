import React, { useState } from "react";
import { Star } from "./Star";

const createArray = (length) => [...Array(length)];
export const Starrating = ({ totalStars = 5 }) => {
  const [selectedStars, setSelectStars] = useState(0);
  const handleClickRating = () => {
    axios
      .post(`http://localhost:3000/tours/${tour_id}/rating/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onSelect={() => {
            setSelectStars(i + 1);
          }}
        />
      ))}
      <p>
        {selectedStars} de {totalStars} estrellas
      </p>
    </>
  );
};
