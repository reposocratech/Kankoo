import React, { useContext, useEffect, useState } from "react";
import { KankooContext } from "../../../context/KankooContext";
import axios from "axios";
import { CardOneTourFav } from "../../../components/CardOneTour/CardOneTourFav";

export const BoughtTours = () => {
  const [acquiredTours, setAcquiredTours] = useState([]);
  const { user } = useContext(KankooContext);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/users/${user?.user_id}/boughttoursgallery`)
      .then((res) => {
        console.log("Response from server:", res);
        setAcquiredTours(res.data.result);
        console.log("A ESTO SE SETEAN LOS ACQUIRED TOURS", res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user?.user_id]);
  return (
    <>
      {acquiredTours?.map((tour) => {
        return <CardOneTourFav key={tour.tour_id} tour={tour} />;
      })}
    </>
  );
};
