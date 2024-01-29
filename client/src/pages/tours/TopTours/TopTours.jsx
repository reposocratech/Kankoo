import axios from "axios";
import React, { useEffect, useState } from "react";
import { CardOneTour } from "../../../components/CardOneTour/CardOneTour";

export const TopTours = () => {
  const [topTours, setTopTours] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3000/tours/toptours")
      .then((res) => {
        setTopTours(res.data.topResult);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1>Los tours mejor valorados</h1>
      {topTours?.map((elem) => {
        return <CardOneTour elem={elem} />;
      })}
    </>
  );
};
