import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { KankooContext } from "../../../context/KankooContext";
import { CardOneTourFav } from "../../../components/CardOneTour/CardOneTourFav";
export const Favorites = () => {
  const [favTours, setFavTours] = useState([]);
  const { user } = useContext(KankooContext);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${user?.user_id}/favtoursgallery`)
      .then((res) => {
        console.log("Response from server:", res);
        setFavTours(res.data.result);
        console.log("A ESTO SE SETEAN LOS FAV TOURS", res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.user_id]);
  return (
    <>
      {favTours?.map((tour) => {
        return <CardOneTourFav key={tour.tour_id} tour={tour} />;
      })}
    </>
  );
};
